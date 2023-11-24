import { PositionalAudio } from '@react-three/drei';
import positional from './data/positional.json';
import { PivotControls } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useEffect } from 'react';
import { useContext } from 'react';
import { InterfaceContext } from '../../../../../../Providers/InterfaceProvider';
import { useState } from 'react';

export default function PositionalAudioManager() {
  const positionRef = useRef([]);
  const playRef = useRef([]);
  const flagsRef = useRef([]);
  const { scrollPositionRef } = useContext(InterfaceContext);
  const [scroll, setScroll] = useState(scrollPositionRef.current);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(scrollPositionRef.current);
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 69) {
        // Le code 69 correspond à la touche "E"
        console.log(positionRef.current);
      }
    });

    positional.forEach((audio) => {
      positionRef.current.push(audio.position);
      playRef.current.push(audio);
      flagsRef.current.push(false);
    });
  }, []);

  useEffect(() => {
    positional.forEach((p, key) => {
      const audio = playRef.current[key].current;
      if (!audio?.isPlaying && p.start < scroll && !flagsRef.current[key]) {
        audio?.play();
        flagsRef.current[key] = true;
      } else if (p.start > scroll && flagsRef.current[key]) {
        audio?.stop();
        flagsRef.current[key] = false;
      }
    });
  }, [scroll]);

  const groupRender = ({ url, distance, volume, start }, key) => (
    <group key={key} position={positionRef.current[key]}>
      <PositionalAudio
        ref={playRef.current[key]}
        url={url}
        distance={distance}
        volume={volume}
        autoplay={url && !start}
        loop={url && !start}
      />
    </group>
  );

  return (
    <>
      {positional.map((audio, key) => {
        return audio.pivot ? (
          <PivotControls
            key={key}
            scale={0.1}
            offset={audio.position}
            onDrag={(l, dl, w, dw) => {
              const position = new THREE.Vector3(...audio.position);
              const rotation = new THREE.Quaternion();
              w.decompose(position, rotation, new THREE.Vector3());
              positionRef.current[key] = position.toArray();
            }}
          >
            {groupRender(audio, key)}
          </PivotControls>
        ) : (
          groupRender(audio, key)
        );
      })}
    </>
  );
}
