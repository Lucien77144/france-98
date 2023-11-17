import * as THREE from 'three';
import { Plane, shaderMaterial } from '@react-three/drei';
import vertexShader from './shaders/vertexShader.vert?raw';
import fragmentShader from './shaders/fragmentShader.frag?raw';
import { useRef } from 'react';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect } from 'react';

const FlagMaterial = shaderMaterial(
  {
    uColor: { value: new THREE.Color('#0ff8f1') },
    uTime: { value: 0 },
    uMove: { value: 0 },
    uResolution: { value: new THREE.Vector2(0, 0) },
    uFlagTexture: { value: null },
  },
  vertexShader,
  fragmentShader
);
extend({ FlagMaterial });

export default function Flag({ position = [0, 0, 0], args = [20, 10] }) {
  const planeRef = useRef(null);
  const materialRef = useRef(null);

  const { size } = useThree();

  const flagTexture = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/french-flag.jpg'
  );

  useEffect(() => {
    materialRef.current.uniforms.uFlagTexture.value = flagTexture;
  }, [flagTexture]);

  useEffect(() => {
    materialRef.current.uniforms.uResolution.value = new THREE.Vector2(
      size.width,
      size.height
    );
  }, [size]);

  useFrame(({ clock }) => {
    // Update time uniform :
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uMove.value = Math.cos(clock.elapsedTime);
  });

  return (
    <Plane
      ref={planeRef}
      position={position}
      args={args}
      rotation={[0, Math.PI / 2, 0]}
    >
      <flagMaterial
        attach="material"
        ref={materialRef}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </Plane>
  );
}
