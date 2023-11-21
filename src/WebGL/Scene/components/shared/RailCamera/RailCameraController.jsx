import React, { useContext, useEffect, useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  objectALookAtObjectBWithLerp,
  objToTargetPos,
} from '../../../../Utils/Utils';
import * as THREE from 'three';
import { TemplateContext } from '../../../../../providers/TemplateProvider';

function RailCameraController({
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

  useEffect(() => {
    if (empty && empty.current) {
      camPosition.current = empty.current.position;
      camRotation.current = empty.current.rotation;
      if (actions) {
        action.current = Object.values(actions)[0];
        action.current.play().paused = true;
      } else {
        action.current = [0,1,3];
      }
      camera.position.set(
        camPosition.current.x,
        camPosition.current.y,
        camPosition.current.z
      );
      camera.rotation.set(
        camRotation.current.x,
        camRotation.current.y,
        camRotation.current.z
      );
    }
    function showPos() {
      // console.log(data.offset)
    }

    window.addEventListener('click', showPos);
    return () => {
      window.removeEventListener('click', showPos);
    };
  }, []);

  useFrame((state, delta) => {
    if (empty && empty.current) {
      if (stateAnim.current === 'classic') {
        classicCamPos(delta);
        classicCamRot();
        projectRef.current.sheet('global').sequence.position = data.offset * 15;
      } else if (stateAnim.current === 'enter') {
        if (data.delta == 0 && canScroll.current) {
          previousScroll.current = [data.scroll.current, data.el.scrollTop];
          canScroll.current = false;
        }
        if (
          itemFocus &&
          itemFocus.current.position.distanceTo(camera.position) >=
            interactSettings.focusDistance
        ) {
          objToTargetPos(camera, itemFocus.current, delta, lambda);
        }
        if (previousScroll.current) {
          data.offset = previousScroll.current[0];
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
        data.offset = previousScroll.current[0];
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
        action.current.getClip().duration * data.offset,
        100,
        delta
      );
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

export default RailCameraController;

// if(anim1 && anim2 && anim3){
//     if(scrollSign.current == 0 && anim1.timeScale != 2){
//         anim1.timeScale = 2
//         anim2.timeScale = 2;
//         anim3.timeScale = 2;
//     }
//     else if(scrollSign.current !== 0 && anim1.timeScale != 0.5){
//         console.log("pause")
//         anim1.timeScale = 0.5
//         anim2.timeScale = 0.5;
//         anim3.timeScale = 0.5;
//     }
// }
