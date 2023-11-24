import { PositionalAudio } from '@react-three/drei';
import positional from './data/positional.json';
import { PivotControls } from '@react-three/drei';
import { useRef } from 'react';

import * as THREE from 'three';
import { useEffect } from 'react';

export default function PositionalAudioManager() {
  const positionRef = useRef([]);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 69) {
        // Le code 69 correspond à la touche "E"
        console.log(positionRef.current);
      }
    });

    positional.forEach((audio) => {
      positionRef.current.push(audio.position);
    });
  }, []);

  const groupRender = ({ url, distance, volume }, key) => (
    <group key={key} position={positionRef.current[key]}>
      <PositionalAudio
        url={url}
        distance={distance}
        volume={volume}
        autoplay
        loop
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
