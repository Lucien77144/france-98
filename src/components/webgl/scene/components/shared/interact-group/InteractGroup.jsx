import React, { useContext } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { getVecDirItemToTarget } from '../../../../Utils/Utils';
import * as THREE from 'three';
import { TemplateContext } from '../../../../../../providers/TemplateProvider';

function InteractGroup({ children, groupInteractRef }) {
  const { camera, pointer } = useThree();
  const { interactSettings, interactObjs } = useContext(TemplateContext);

  // Créer les matériaux une seule fois et les réutiliser
  const unfocusMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    dithering: true,
  });

  const focusMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    dithering: true,
  });

  const handleFocus = (object, indexToRemove) => {
    if (indexToRemove === -1) {
      if (interactSettings.fctIn === 'none') {
        // object.material = focusMaterial;
      } else {
        interactSettings.fctIn();
      }
      interactObjs.current.push(object);
    }
  };

  const handleUnfocus = (object, indexToRemove) => {
    if (indexToRemove !== -1) {
      if (interactSettings.fctOut === 'none') {
        // object.material = unfocusMaterial;
      } else {
        interactSettings.fctOut();
      }
      interactObjs.current.splice(indexToRemove, 1);
    }
  };

  useFrame(() => {
    if (groupInteractRef.current) {
      groupInteractRef.current.children.forEach((child) => {
        const object = child;
        const objectWorldPos = new THREE.Vector3();
        const indexToRemove = interactObjs.current.findIndex(
          (obj) => obj.id === object.id
        );

        const [camDir, itemDir, dot] = getVecDirItemToTarget(camera, object);

        object.getWorldPosition(objectWorldPos);

        if (
          objectWorldPos.distanceTo(camera.position) <=
            interactSettings.distance &&
          dot > interactSettings.dotThreshold
        ) {
          handleFocus(object, indexToRemove);
        } else if (object.material !== unfocusMaterial) {
          handleUnfocus(object, indexToRemove);
        }
      });
    }
  });
  return <>{children}</>;
}

export default InteractGroup;
