import React, { createContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const SoundContext = createContext(null);

/**
 * Sound provider
 * @param {Object} children Children of the provider
 * @returns
 */
function SoundProvider({ children }) {
  const audioLoader = useRef(new THREE.AudioLoader());
  const audioListener = useRef(new THREE.AudioListener());
  const [audioScene, setAudioScene] = useState({
    mapScene: {
      ambient: {
        audio: null,
        source: '/src/assets/audio/bass.mp3',
      },
    },
    splineScene: {
      ambient: {
        audio: null,
        source: '/src/assets/audio/paris.mp3',
      },
    },
  });

  useEffect(() => {
    for (const [scene, sceneObj] of Object.entries(audioScene)) {
      for (const [context, contextObj] of Object.entries(sceneObj)) {
        if (contextObj.source) {
          audioLoader.current.load(contextObj.source, (buffer) => {
            const audio = new THREE.Audio(audioListener.current);
            audio.setBuffer(buffer);
            audio.setVolume(1);
            audio.pause();

            setAudioScene((prevAudioScene) => ({
              ...prevAudioScene,
              mapScene: {
                ambient: {
                  audio: audio,
                  source: contextObj.source,
                },
              },
            }));
          });
        }
      }
    }
  }, []);

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
        setAudioScene,
        addNewAudioSrc,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export default SoundProvider;
