import React, { useEffect, useRef, useState } from "react";
import { Instance, Instances, PivotControls, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Spectators({ material, data, total, config, pivot }) {
  const { nodes } = useGLTF("/src/assets/models/supporter.glb");
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
          <Instances
            range={total}
            material={material}
            geometry={nodes.Cube.geometry}
            {...config}
          >
            {data.map((props, i) => (
              <Spectator key={i} {...props}/>
            ))}
          </Instances>
        </PivotControls>
      ) : (
        <Instances
          range={total}
          material={material}
          geometry={nodes.Cube.geometry}
          {...config}
        >
          {data.map((props, i) => (
            <Spectator key={i} {...props}/>
          ))}
        </Instances>
      )}
    </>
  );
}

function Spectator({ random,intensity, ...props }) {
  const ref = useRef();
  const posInit = useRef();

  useEffect(() => {
    posInit.current = ref.current.position.clone();
    
    // console.log(ref.current.parent.position)
  }, []);

    useFrame((state) => {
      const t = state.clock.getElapsedTime() + random * 10000
      ref.current.position.y = posInit.current.y + Math.abs(Math.sin(t*7.5)) * .0025
    })
  return <Instance ref={ref} {...props} />;
}

useGLTF.preload("/src/assets/models/supporter.glb");
