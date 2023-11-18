import { Plane, shaderMaterial } from '@react-three/drei';

import vertexShader from './shaders/vertexShader.vert?raw';
import fragmentShader from './shaders/fragmentShader.frag?raw';

import * as THREE from 'three';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TemplateContext } from '../../../../../providers/TemplateProvider';
import gsap from 'gsap';
import { useContext } from 'react';

const InteractiveMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    uHover: { value: false },
    uColor: { value: null },
    uOpacity: { value: 0 },
  },
  vertexShader,
  fragmentShader
);
extend({ InteractiveMaterial });

export default function InteractivePoint({
  position = [0, 0, 0],
  size = 1,
  color = new THREE.Color('#ffd500'),
}) {
  const materialRef = useRef(null);
  const planeRef = useRef(null);
  const pointRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isFocus } = useContext(TemplateContext);
  const { clock } = useThree();

  useFrame(({ camera }) => {
    planeRef.current.lookAt(camera.position);

    const distance = camera.position.distanceTo(planeRef.current.position);
    const scale = distance / 10;
    planeRef.current.scale.set(scale, scale, scale);

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  useEffect(() => {
    if (materialRef?.current) {
      materialRef.current.uniforms.uHover.value = isHovered;
    }
  }, [isHovered]);

  useEffect(() => {
    // change opacity of material :
    if (materialRef?.current?.uniforms?.uOpacity) {
      pointRef.current.scale.set(1, 1, 1);
      gsap.to(materialRef.current.uniforms.uOpacity, {
        duration: 0.25,
        value: isFocus ? 0 : 1,
        onComplete: () => {
          if (isFocus) {
            pointRef.current.scale.set(0, 0, 0);
          }
        },
      });
    }
  }, [isFocus]);

  useEffect(() => {
    if (materialRef?.current) {
      materialRef.current.uniforms.uColor.value = color;
    }
  }, []);

  return (
    <>
      <group ref={pointRef} position={position}>
        <Plane
          ref={planeRef}
          args={[size, size]}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        >
          <interactiveMaterial
            attach="material"
            ref={materialRef}
            transparent={true}
            opacity={0}
            side={THREE.DoubleSide}
          />
        </Plane>
      </group>
    </>
  );
}
