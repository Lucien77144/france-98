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
import { SoundContext } from '../../../../../providers/SoundProvider';

export const POINT_TYPE = {
  NONE: null,
  SOUND: '',
};

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
  colors = {
    primary: new THREE.Color('#9c08b2'),
    active: new THREE.Color('#ffd500'),
  },
  type = POINT_TYPE.NONE,
  audio = {
    scene: 'stadiumScene',
    context: 'ambient',
  },
}) {
  const materialRef = useRef(null);
  const planeRef = useRef(null);
  const pointRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { isFocus } = useContext(TemplateContext);
  const { audioScene, audioEnd, setAudioEnd } = useContext(SoundContext);

  const { clock } = useThree();

  const [status, setStatus] = useState('stop');

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
      materialRef.current.uniforms.uColor.value = colors.active;
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case 'stop':
      case 'pause':
        fadeColor('primary');
        break;
      case 'play':
        fadeColor('active');
        break;
    }
  }, [status]);

  useEffect(() => {
    if (audioEnd == 'audio_click' && status == 'play') {
      audioScene?.ui?.audio_click?.audio?.stop();
      audioScene?.[audio?.scene]?.[audio?.context]?.audio?.play();
    } else if (audioEnd?.includes(audio?.context)) {
      fadeColor('primary');

      const action = status == 'play' ? 'pause' : 'stop';

      audioScene?.ui?.audio_click?.audio?.[action]();
      audioScene?.[audio?.scene]?.[audio?.context]?.audio?.[action]();

      setStatus(action);
    }
  }, [audioEnd]);

  function pauseAllSounds(prevent, scene = 'stadiumScene') {
    const scenes = Object.keys(audioScene[scene]);
    setAudioEnd(scenes.filter((s) => s != prevent));
  }

  function toggleSound() {
    pauseAllSounds(audio?.context);
    setTimeout(() => {
      switch (status) {
        case 'stop':
          setStatus('play');

          audioScene?.ui?.audio_click?.audio?.play(); // on audio click finished, play the ambient sound :
          materialRef.current.uniforms.uColor.value = colors.primary;
          break;
        case 'pause':
          setStatus('play');

          audioScene?.[audio?.scene]?.[audio?.context]?.audio?.play();
          materialRef.current.uniforms.uColor.value = colors.primary;
          break;
        case 'play':
          setStatus('pause');

          audioScene?.ui?.audio_click?.audio?.pause();
          audioScene?.[audio?.scene]?.[audio?.context]?.audio?.pause();
          materialRef.current.uniforms.uColor.value = colors.active;
          break;
      }
    });
  }

  function fadeColor(color, duration = 0.25) {
    gsap.to(materialRef.current.uniforms.uColor.value, {
      duration,
      r: colors?.[color]?.r,
      g: colors?.[color]?.g,
      b: colors?.[color]?.b,
    });
  }

  return (
    <>
      <group
        // on click :
        onClick={toggleSound}
        ref={pointRef}
        position={position}
      >
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
