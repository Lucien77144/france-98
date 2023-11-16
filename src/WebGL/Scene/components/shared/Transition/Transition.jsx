import React, { useContext, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

import * as THREE from 'three';
import { useVideoTexture } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import TransitionMaterial from './TransitionMaterial';
import { TemplateContext } from '../../../../../providers/TemplateProvider';

function Transition() {
  const { inAnimTrans } = useContext(TemplateContext);

  const meshRef = useRef();
  const { camera, size } = useThree();

  // Distance entre la caméra et la plane
  const distance = 0.1;

  // Mise à jour de la taille de la plane pour qu'elle remplisse la vue
  const aspect = size.width / size.height;
  const height =
    2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
  const width = height * aspect;

  // Ajuster la plane à chaque frame (utile si la caméra bouge)
  useFrame(() => {
    if (meshRef.current && inAnimTrans) {
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

  const { interactObjs } = useContext(TemplateContext);
  const location = useLocation();

  useEffect(() => {
    interactObjs.current = [];
  }, [location]);

  // const textureVideo = useVideoTexture("./fogTransitionOut1080p.mp4");

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

  const fragmentShader = `
        #define M_PI 3.1415926535897932384626433832795

    precision mediump float;
    
    uniform sampler2D uTexture; // Votre succession d'images
    uniform float uProgress; // Pour animer la séquence
    uniform float uTotalImages; // Nombre total d'images
    
    varying vec2 vUv;

    void main() {
        float progress = sin(M_PI * uProgress);
        gl_FragColor = vec4(progress);

    }
    `;

  const textureVideo = useVideoTexture(
    '/src/assets/video/fogTransitionOut1080p.mp4',
    {
      unsuspend: 'canplay',
      muted: false,
      loop: false,
      start: false,
      crossOrigin: 'Anonymous',
    }
  );

  return (
    <mesh ref={meshRef} position={[0, 0, -distance]} scale={[width, height, 1]}>
      <planeGeometry args={[1, 1]} />
      {/* <TransitionMaterial
        meshRef={meshRef}
        src={{ textureVideo }}
        type={'video'}
      /> */}
      <TransitionMaterial
        meshRef={meshRef}
        src={{ fragmentShader, vertexShader, duration: 2 }}
        type={'shader'}
      />
    </mesh>
  );
}

export default Transition;
