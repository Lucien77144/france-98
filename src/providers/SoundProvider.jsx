import React, { createContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useContext } from 'react';
import { InterfaceContext } from './InterfaceProvider';

export const SoundContext = createContext(null);

/**
 * Sound provider
 * @param {Object} children Children of the provider
 * @returns
 */
export default function SoundProvider({ children }) {
  const audioLoader = useRef(new THREE.AudioLoader());
  const audioListener = useRef();
  const [audioEnd, setAudioEnd] = useState();

  const { startExperience } = useContext(InterfaceContext);

  const [audioScene, setAudioScene] = useState({
    ui: {
      audio_click: {
        audio: null,
        source: '/src/assets/audio/audio_start.mp3',
        volume: 0.75,
      },
    },
    stadiumScene: {
      track_01: {
        audio: null,
        source: '/src/assets/audio/tracks/1.mp3',
        volume: 1,
      },
      track_02: {
        audio: null,
        source: '/src/assets/audio/tracks/2.mp3',
        volume: 1,
      },
      track_03: {
        audio: null,
        source: '/src/assets/audio/tracks/3.mp3',
        volume: 1,
      },
      track_04: {
        audio: null,
        source: '/src/assets/audio/tracks/4.mp3',
        volume: 1,
      },
      track_05: {
        audio: null,
        source: '/src/assets/audio/tracks/5.mp3',
        volume: 1,
      },
      track_06: {
        audio: null,
        source: '/src/assets/audio/tracks/6.mp3',
        volume: 1,
      },
      track_07: {
        audio: null,
        source: '/src/assets/audio/tracks/7.mp3',
        volume: 1,
      },
    },
    stadiumAmbiant: {
      crowd: {
        audio: null,
        source: '/src/assets/audio/crowd.mp3',
        volume: 0.1,
        range: [0, 0.5],
        loop: true,
      },
    },
  });

  useEffect(() => {
    if (!startExperience) return;
    audioListener.current ??= new THREE.AudioListener();

    for (const [scene, sceneObj] of Object.entries(audioScene)) {
      for (const [context, contextObj] of Object.entries(sceneObj)) {
        if (contextObj.source) {
          audioLoader.current.load(contextObj.source, (buffer) => {
            const audio = new THREE.Audio(audioListener.current);
            audio.setBuffer(buffer);
            audio.setVolume(contextObj.volume);
            audio.pause();
            audio.onEnded = () => {
              setAudioEnd(context);
            };
            audio.loop = !!contextObj.loop;

            setAudioScene((prevAudioScene) => ({
              ...prevAudioScene,
              [scene]: {
                ...prevAudioScene[scene],
                [context]: {
                  audio,
                  source: contextObj.source,
                },
              },
            }));
          });
        }
      }
    }
  }, [startExperience]);

  function addNewAudioSrc(newAudioSrc, sceneName) {
    // Utilisez audioLoader pour charger le fichier audio
    audioLoader.current.load(newAudioSrc.src, (buffer) => {
      const newAudio = new THREE.Audio(audioListener.current);
      newAudio.setBuffer(buffer);
      newAudio.setVolume(0.5);
      newAudio.pause();

      // Mettez à jour le state audioScene pour stocker le nouvel audio
      setAudioScene((prevAudioScene) => ({
        ...prevAudioScene,
        [sceneName]: {
          ...prevAudioScene[sceneName],
          [newAudioSrc.name]: {
            audio: newAudio,
            source: newAudioSrc.src,
          },
        },
      }));
    });
  }

  return (
    <SoundContext.Provider
      value={{
        audioLoader,
        audioListener,
        audioScene,
        audioEnd,

        setAudioScene,
        addNewAudioSrc,
        setAudioEnd,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
