// AlambicScene.js
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

function FrontPlane({
  shader,
  dimension,
  onPointerMove = () => {},
  onPointerLeave = () => {},
}) {
  const { camera, size } = useThree();
  const meshRef = useRef();

  const distance = 10;

  // Mise à jour de la taille de la plane pour qu'elle remplisse la vue
  const aspect = size.width / size.height;
  const height =
    2 *
    Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) *
    distance *
    (dimension / 100);
  const width = height * aspect;

  // Ajuster la plane à chaque frame (utile si la caméra bouge)
  useFrame(() => {
    if (meshRef.current) {
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      const planePos = camera.position
        .clone()
        .add(camDir.multiplyScalar(distance));
      meshRef.current.position.set(planePos.x, planePos.y, planePos.z);
      meshRef.current.quaternion.set(
        camera.quaternion.x,
        camera.quaternion.y,
        camera.quaternion.z,
        camera.quaternion.w
      );
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={[0, 0, -distance]}
        scale={[width, height, 1]}
        receiveShadow={false}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <PlaneGeometry args={[1, 1]} />
        {shader}
        {/*<meshBasicMaterial attach="material" color="rgba(233, 69, 69, 1)" side={2} transparent={true}  opacity={.75} />*/}
        {/*<TransitionMaterial meshRef={meshRef} src={{fragmentShader, vertexShader, duration:2}} type={"shader"} />*/}
      </mesh>
    </>
  );
}

export default FrontPlane;
