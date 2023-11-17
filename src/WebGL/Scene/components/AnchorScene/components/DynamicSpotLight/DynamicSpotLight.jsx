import { Box, Plane, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

import vertexShader from './shaders/vertexShader.vert?raw';
import fragmentShader from './shaders/fragmentShader.frag?raw';
import { useRef } from 'react';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const SpotMaterial = shaderMaterial(
  {
    uColor: { value: new THREE.Color('#0ff8f1') },
    uSpotLight: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(0, 0) },
  },
  vertexShader,
  fragmentShader
);
extend({ SpotMaterial });

export default function DynamicSpotLight({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}) {
  const spotRef = useRef(null);
  const planeRef = useRef(null);
  const materialRef = useRef(null);

  const lightTexture = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/spotlight.jpg'
  );

  const { size } = useThree();

  // set the origin of the rotation to left middle :
  useEffect(() => {
    planeRef.current.geometry.translate(-10, 0, 0);
    planeRef.current.scale.set(scale, scale, scale);
  }, []);

  useEffect(() => {
    materialRef.current.uniforms.uSpotLight.value = lightTexture;
    materialRef.current.uniforms.uResolution.value = new THREE.Vector2(
      size.width,
      size.height
    );
  }, [lightTexture, size]);

  useFrame(({ camera, clock }) => {
    // Rotate plane :
    // planeRef.current.rotation.x += clock.elapsedTime * 0.001;
    // planeRef.current.rotation.y += clock.elapsedTime * 0.001;

    // Update time uniform :
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <group ref={spotRef}>
      <Box args={[0.025, 0.025, 0.025]} position={position} />
      <Plane
        ref={planeRef}
        position={position}
        rotation={rotation}
        args={[20, 10]}
      >
        <spotMaterial
          attach="material"
          ref={materialRef}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </Plane>
    </group>
  );
}
