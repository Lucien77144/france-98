/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useHelper, PivotControls, SpotLight } from "@react-three/drei";
import { useControls } from "leva";

export default function SpotLightMove({ target,intensity = 0, pivot = false }) {
  const group = useRef();
  const spotLight = useRef();
  const spotLight2 = useRef();

  const rotationRef = useRef();
  const positionRef = useRef();

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.keyCode === 69 && pivot) {
        // Le code 69 correspond à la touche "E"
        console.log(positionRef.current, rotationRef.current);
      }
    });
  }, []);

  const groupRender = (
    <>
      <group
        ref={group}
        dispose={null}
        position={[
          0.5241105411857757, -2.941515908301839e-9, -0.000004764298356709531,
        ]}
      >
        <SpotLight
          ref={spotLight}
          intensity={10}
          distance={20}
          angle={0.1}
          attenuation={15}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
        />
      </group>
      <group position={[-0.5587403138807835, 6.408411202609682e-9, 0]}>
        <SpotLight
          intensity={10}
          ref={spotLight2}
          distance={15}
          angle={0.1}
          attenuation={15}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
        />
      </group>
    </>
  );

  return (
    <>
      {pivot ? (
        <>
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
          {spotLight2.current && (
            <group>
              <primitive
                object={spotLight.current.target}
                position={[
                  0.05003161305639248, -0.0001885396297084739,
                  -0.6053271141307325,
                ]}
              />
              <primitive
                object={spotLight2.current.target}
                position={[
                  0.05003161305639248, -0.0001885396297084739,
                  -0.6053271141307325,
                ]}
              />
            </group>
          )}
        </>
      ) : (
        <>

          {groupRender}
          {spotLight2.current && spotLight.current && (
            <group>
              <primitive
                object={spotLight.current.target}
                position={target}
              />
              <primitive
                object={spotLight2.current.target}
                position={target}
              />
            </group>
          )}
        </>
      )}
    </>
  );
}
