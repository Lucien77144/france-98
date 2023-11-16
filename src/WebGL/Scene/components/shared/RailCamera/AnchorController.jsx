import React, { useContext, useEffect, useRef, useState } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  getVecDirItemToTarget,
  objectALookAtObjectBWithLerp,
  objToTargetPos,
  objToTargetRot,
} from '../../../../Utils/Utils';
import * as THREE from 'three';
import { types } from '@theatre/core';
import { TemplateContext } from '../../../../../providers/TemplateProvider';

function AnchorController({
  empty,
  anchorsRef = null,
  actions = null,
  lambda = 10,
  lookAtPos = null,
  rotationSpeed = 0.0025,
  stateAnim,
  pointerSignOnFocus = null,
}) {
  const camPosition = useRef();
  const camRotation = useRef();
  const action = useRef();
  const index = useRef(0);
  const anchors = useRef([]);

  const [indexTarget, setIndexTarget] = useState(0);
  const { camera } = useThree();
  const data = useScroll();
  const { projectRef, interactSettings, itemFocus, scrollSign } =
    useContext(TemplateContext);

  useEffect(() => {
    if (empty && empty.current) {
      if (anchorsRef && anchorsRef.current) {
        anchors.current = anchorsRef.current.children;
        console.log(anchorsRef.current.children);

        const anchorsColor = projectRef.current.sheet('global').object(
          'anchorsColor',
          {
            anchor0: types.number(0, { range: [0, 1] }),
            anchor1: types.number(0, { range: [0, 1] }),
            anchor2: types.number(0, { range: [0, 1] }),
            anchor3: types.number(0, { range: [0, 1] }),
          },
          { reconfigure: true }
        );

        anchorsColor.onValuesChange((values) => {
          if (anchors.current) {
            anchors.current.forEach((child, i) => {
              child.material.color.r = values['anchor' + i];
            });
          }
        });

        anchors.current.forEach((child, i) => {
          child.material.color.r = anchorsColor.value['anchor' + i];
        });
      }

      camPosition.current = empty.current.position;
      camRotation.current = empty.current.rotation;
      if (actions) {
        action.current = Object.values(actions)[0];
        action.current.play().paused = true;
        action.current.timeScale = 1;
      } else {
        action.current = null;
      }
      camera.position.set(
        camPosition.current.x,
        camPosition.current.y,
        camPosition.current.z
      );
      if (lookAtPos) {
        camera.lookAt(...lookAtPos);
      } else {
        camera.rotation.set(
          camRotation.current.x,
          camRotation.current.y,
          camRotation.current.z
        );
      }
    }
  }, []);

  useFrame((state, delta) => {
    if (empty && empty.current) {
      if (stateAnim.current === 'classic') {
        classicCamPos();
        classicCamRot();
      } else if (
        stateAnim.current === 'enter' &&
        itemFocus.current.position.distanceTo(camera.position) >= 5
      ) {
        objToTargetPos(camera, itemFocus.current, delta, lambda);
        objectALookAtObjectBWithLerp(
          camera,
          itemFocus.current,
          0.11,
          interactSettings.focusOffset,
          pointerSignOnFocus.current
        );
      } else if (stateAnim.current === 'exit') {
        objToTargetPos(camera, empty.current, delta, lambda);
        camera.quaternion.slerp(empty.current.quaternion, 0.05);
        if (camera.position.distanceTo(empty.current.position) <= 0.01) {
          stateAnim.current = 'classic';
        }
      } else if (
        stateAnim.current === 'transition' &&
        anchorsRef &&
        anchorsRef.current
      ) {
        manageTransition(delta);
      }
    }
  });

  function getAnimProg() {
    return action.current.time / action.current.getClip().duration;
  }

  function manageAnchors() {
    if (index.current === indexTarget) {
      const sign = scrollSign.current;
      if (scrollSign.current !== 0) {
        const nextVal = THREE.MathUtils.clamp(
          indexTarget + sign,
          0,
          anchors.current.length - 1
        );
        setIndexTarget((prev) => nextVal);
        const checkLimit =
          (index.current == anchors.current.length - 1 &&
            anchors.current.length - 1 == nextVal) ||
          0 == nextVal;
        if (!checkLimit) {
          stateAnim.current = 'transition';
          action.current.paused = false;
          action.current.timeScale = sign;
        }
      }
    }
  }

  function manageTransition(delta) {
    const wPosAnchor = new THREE.Vector3();
    anchors.current[indexTarget].getWorldPosition(wPosAnchor);
    const wPosEmpty = new THREE.Vector3();
    empty.current.getWorldPosition(wPosEmpty);

    if (Math.abs(index.current - indexTarget) === 1) {
      camera.position.set(
        camPosition.current.x,
        camPosition.current.y,
        camPosition.current.z
      );
      classicCamRot();
      if (wPosAnchor.distanceTo(wPosEmpty) < 0.01) {
        stateAnim.current = 'classic';
        index.current = indexTarget;
        action.current.paused = true;
        action.current.timeScale = 0;
      }
    } else if (Math.abs(index.current - indexTarget) !== 1) {
      objToTargetPos(camera, anchors.current[indexTarget], delta);
      const vec = getVecDirItemToTarget(camera, anchors.current[indexTarget]);
      objToTargetRot(vec, camera, rotationSpeed);
      camera.getWorldPosition(wPosEmpty);
      if (wPosAnchor.distanceTo(wPosEmpty) < 0.01) {
        stateAnim.current = 'classic';
        index.current = indexTarget;
        action.current.paused = true;
        action.current.timeScale = 0;
        action.current.time =
          anchors.current[indexTarget].material.color.r *
          action.current.getClip().duration;
      }
    }
  }

  function classicCamPos() {
    if (actions && data) {
      if (anchorsRef && anchorsRef.current) {
        manageAnchors();
      }
    }
    camera.position.set(
      camPosition.current.x,
      camPosition.current.y,
      camPosition.current.z
    );
  }
  function classicCamRot() {
    if (lookAtPos) {
      camera.lookAt(...lookAtPos);
    } else {
      camera.rotation.set(
        camRotation.current.x,
        camRotation.current.y,
        camRotation.current.z
      );
    }
  }

  return <></>;
}

export default AnchorController;
