import React, { useContext, useEffect, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  objectALookAtObjectBWithLerp,
  objToTargetPos,
} from '../../../../Utils/Utils';
import * as THREE from 'three';
import { TemplateContext } from '../../../../../../providers/TemplateProvider';
import { InterfaceContext } from '../../../../../../Providers/InterfaceProvider';

const DECIMAL = 100000;
export default function RailCameraController({
  empty,
  stateAnim,
  lookAtPos = null,
  actions = null,
  lambda = 10,
  pointerSignOnFocus = 1,
}) {
  const camPosition = useRef();
  const camRotation = useRef();
  const action = useRef();
  const previousScroll = useRef();

  const { camera, pointer } = useThree();
  const data = useScroll();
  const { canScroll, interactSettings, itemFocus, projectRef } =
    useContext(TemplateContext);

  const { scrollPositionRef, redirect, setRedirect } =
    useContext(InterfaceContext);

  useEffect(() => {
    if (empty?.current) {
      camPosition.current = empty.current.position;
      camRotation.current = empty.current.rotation;
      if (actions) {
        action.current = Object.values(actions)[0];
        action.current.play().paused = true;
      } else {
        action.current = [0, 1, 3];
      }
      camera.position.copy(camPosition.current);
      camera.rotation.copy(camRotation.current);
    }
    function showPos() {
      // console.log(scrollPosition);
    }

    window.addEventListener('click', showPos);
    return () => {
      window.removeEventListener('click', showPos);
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      data.el.scrollTop = redirect * data.el.scrollHeight;
      data.scroll.current = redirect;
      data.offset = redirect;

      scrollPositionRef.current = redirect;
      setRedirect(null);
    }
  }, [redirect]);

  useFrame((_, delta) => {
    if (empty?.current) {
      if (stateAnim.current === 'classic') {
        classicCamPos(delta);
        classicCamRot();
        if (data.offset != scrollPositionRef.current) {
          scrollPositionRef.current =
            Math.round(data.offset * DECIMAL) / DECIMAL;
        }
        projectRef.current.sheet('global').sequence.position =
          scrollPositionRef.current * 15;
      } else if (stateAnim.current === 'enter') {
        if (data.delta == 0 && canScroll.current) {
          previousScroll.current = [data.scroll.current, data.el.scrollTop];
          canScroll.current = false;
        }

        if (
          itemFocus?.current.position.distanceTo(camera.position) >=
          interactSettings.focusDistance
        ) {
          objToTargetPos(camera, itemFocus.current, delta, lambda);
        }

        if (previousScroll.current) {
          scrollPositionRef.current =
            Math.round(previousScroll.current[0] * DECIMAL) / DECIMAL;
          data.el.scrollTop = previousScroll.current[1];
          data.scroll.current = previousScroll.current[0];
        }

        objectALookAtObjectBWithLerp(
          camera,
          itemFocus.current,
          0.11,
          interactSettings.focusOffset,
          pointerSignOnFocus.current
        );
      } else if (stateAnim.current === 'exit') {
        objToTargetPos(camera, empty.current, delta, lambda);
        camera.quaternion.slerp(empty.current.quaternion, 0.5);
        data.scroll.current = previousScroll.current[0];
        scrollPositionRef.current =
          Math.round(previousScroll.current[0] * DECIMAL) / DECIMAL;
        data.el.scrollTop = previousScroll.current[1];

        if (camera.position.distanceTo(empty.current.position) < 0.001) {
          stateAnim.current = 'classic';
          canScroll.current = true;
          previousScroll.current = null;
        }
      }
    }
  });

  function classicCamPos(delta) {
    if (actions && data) {
      action.current.time = THREE.MathUtils.damp(
        action.current.time,
        action.current.getClip().duration * scrollPositionRef.current,
        100,
        delta
      );
    }

    camera.position.copy(camPosition.current);
  }
  function classicCamRot() {
    if (lookAtPos) {
      camera.lookAt(...lookAtPos);
    } else {
      camera.rotation.copy(camRotation.current);
    }
  }

  return <></>;
}
