import { Plane, shaderMaterial } from '@react-three/drei';

import vertexShader from './shaders/vertexShader.vert?raw';
import fragmentShader from './shaders/fragmentShader.frag?raw';

import * as THREE from 'three';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { TemplateContext } from '../../../../../../providers/TemplateProvider';
import gsap from 'gsap';
import { useContext } from 'react';
import { SoundContext } from '../../../../../../providers/SoundProvider';

export const POINT_TYPE = {
  NONE: null,
  SOUND: '',
};

const InteractiveMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uProgress: { value: 0 },
    uColor: { value: null },
    uPrimaryColor: { value: null },
    uActionColor: { value: null },
    uPlaying: { value: false },
    uPause: { value: null },
    uPlay: { value: null },
  },
  vertexShader,
  fragmentShader
);
extend({ InteractiveMaterial });

export default function InteractivePoint({
  position = [0, 0, 0],
  size = 0.75,
  colors = {
    primary: new THREE.Color('#001eff'),
    action: new THREE.Color('#af2bfc'),
  },
  audio = {
    scene: 'stadiumScene',
    context: 'ambient',
  },
  range = [0, 1],
}) {
  const materialRef = useRef(null);
  const planeRef = useRef(null);
  const pointRef = useRef(null);

  const { isFocus, scrollPosition } = useContext(TemplateContext);
  const { audioScene, audioEnd, setAudioEnd } = useContext(SoundContext);

  const { clock } = useThree();

  const [status, setStatus] = useState('stop');
  const [startTime, setStartTime] = useState(0);

  const playImg = useLoader(THREE.TextureLoader, '/src/assets/img/ui/play.png');
  const pauseImg = useLoader(
    THREE.TextureLoader,
    '/src/assets/img/ui/pause.png'
  );

  useFrame(({ camera }) => {
    planeRef.current.lookAt(camera.position);

    const distance = camera.position.distanceTo(planeRef.current.position);
    const scale = distance / 10;
    planeRef.current.scale.set(scale, scale, scale);

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;

    if (status == 'play') {
      const ctxtAudio = audioScene?.[audio?.scene]?.[audio?.context]?.audio;
      const duration = ctxtAudio?.buffer?.duration || 0;

      const progress = Math.min((clock.elapsedTime - startTime) / duration, 1);

      materialRef.current.uniforms.uProgress.value = progress;
    }
  });

  useEffect(() => {
    // change opacity of material :
    if (materialRef?.current?.uniforms?.uOpacity) {
      pointRef.current.scale.set(1, 1, 1);
      gsap.to(materialRef.current.uniforms.uOpacity, {
        duration: 0.25,
        value: isFocus ? 0 : 1,
        onComplete: () => {
          isFocus && pointRef.current.scale.set(0, 0, 0);
        },
      });
    }
  }, [isFocus]);

  useEffect(() => {
    if (scrollPosition > range[0] && scrollPosition < range[1]) {
      pointRef.current.visible = true;
    } else {
      pointRef.current.visible = false;
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (materialRef?.current) {
      materialRef.current.uniforms.uColor.value = colors.primary;
      materialRef.current.uniforms.uPrimaryColor.value = colors.primary;
      materialRef.current.uniforms.uActionColor.value = colors.action;

      materialRef.current.uniforms.uPlay.value = playImg;
      materialRef.current.uniforms.uPause.value = pauseImg;
    }
  }, []);

  useEffect(() => {
    const animDuration = 250;
    switch (status) {
      case 'stop':
      case 'pause':
        fadeColor('primary', animDuration / 1000);
        materialRef.current.uniforms.uPlaying.value = false;

        setTimeout(() => {
          materialRef.current.uniforms.uProgress.value = 0;
        }, animDuration);
        break;
      case 'play':
      case 'play_intro':
        fadeColor('action', animDuration / 1000);
        materialRef.current.uniforms.uPlaying.value = true;
        break;
    }
  }, [status]);

  useEffect(() => {
    if (audioEnd == 'audio_click' && status == 'play_intro') {
      audioScene.ui?.audio_click?.audio?.stop();
      audioScene?.[audio?.scene]?.[audio?.context]?.audio?.play();

      setStatus('play');
      setStartTime(clock.elapsedTime);
    } else if (audioEnd?.includes(audio?.context)) {
      audioScene.ui?.audio_click?.audio?.stop();
      audioScene?.[audio?.scene]?.[audio?.context]?.audio?.stop();

      fadeColor('primary');
      setStatus('stop');
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
          setStatus('play_intro');

          audioScene?.ui?.audio_click?.audio?.play(0); // on audio click finished, play the ambient sound :
          materialRef.current.uniforms.uColor.value = colors.primary;
          break;
        case 'pause':
          setStatus('play');
          setStartTime(clock.elapsedTime - startTime);

          audioScene?.[audio?.scene]?.[audio?.context]?.audio?.play();
          materialRef.current.uniforms.uColor.value = colors.primary;
          break;
        case 'play':
        case 'play_intro':
          setStatus('pause');
          setStartTime(clock.elapsedTime - startTime);

          audioScene?.ui?.audio_click?.audio?.pause();
          audioScene?.[audio?.scene]?.[audio?.context]?.audio?.pause();
          materialRef.current.uniforms.uColor.value = colors.action;
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
        <Plane ref={planeRef} args={[size, size]}>
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
