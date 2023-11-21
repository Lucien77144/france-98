/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import {
  useAnimations,
  PivotControls,
} from "@react-three/drei";

export default function PlayerModel({ action,clone, material, config, pivot = false }) {
  const group = useRef();
  const rotationRef = useRef();
  const positionRef = useRef();

  const { actions } = useAnimations(clone.current.animations, group);
 
  useEffect(() => {

    action.current = actions;

    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 69 && pivot) {
        // Le code 69 correspond à la touche "E"
        console.log(positionRef.current, rotationRef.current);
      }
    });
  }, []);

  const groupRender = (
    <group ref={group} dispose={null} scale={0.02} {...config}>
      <primitive object={clone.current.scene} />
    </group>
    ) 
    
    

  return (
    <>
      {pivot ? (
        <PivotControls
          scale={0.1}
          onDrag={(l, dl, w, dw) => {
            const position = new THREE.Vector3();
            const rotation = new THREE.Quaternion();
            w.decompose(position, rotation, new THREE.Vector3());
            rotationRef.current = rotation.toArray();
            positionRef.current = position.toArray();
          }}
        >
          {groupRender}
        </PivotControls>
      ) : (
        <>{groupRender}</>
      )}
    </>
  );
}
