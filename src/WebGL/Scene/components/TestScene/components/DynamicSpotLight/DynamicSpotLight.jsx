import { Plane, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import vertexShader from './shaders/vertexShader.vert?raw';
import fragmentShader from './shaders/fragmentShader.frag?raw';
import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';

const SpotMaterial = shaderMaterial(
  {
    uColor: { value: new THREE.Color('#0ff8f1') },
  },
  vertexShader,
  fragmentShader
);
extend({ SpotMaterial });

export default function DynamicSpotLight() {
  const materialRef = useRef(null);
  const planeRef = useRef(null);

  // make plane look at camera :
  useFrame(({ camera }) => {
    planeRef.current.lookAt(camera.position);
  });

  return (
    <Plane ref={planeRef} position={[0, 0, 0]} args={[10, 10]}>
      <spotMaterial
        attach="material"
        ref={materialRef}
        transparent={true}
        side={THREE.DoubleSide}
        opacity={0.5}
      />
    </Plane>
  );
}
