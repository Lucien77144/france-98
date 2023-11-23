import { useContext } from 'react';
import { InterfaceContext } from '../../../../../../Providers/InterfaceProvider';
import { useEffect } from 'react';

import ambiant from './data/ambiant.json';
import { useState } from 'react';
import { SoundContext } from '../../../../../../providers/SoundProvider';
import gsap from 'gsap';

export default function AmbiantAudioManager({ scene = 'stadiumAmbiant' }) {
  const { scrollPosition } = useContext(InterfaceContext);
  const { audioScene } = useContext(SoundContext);

  const [ambiantList, setAmbiantList] = useState();

  useEffect(() => {
    const newAmbiant = ambiant
      .filter(
        ({ range }) => scrollPosition >= range[0] && scrollPosition <= range[1]
      )
      .map(({ context }) => context);

    if (newAmbiant?.join('') != ambiantList?.join('')) {
      setAmbiantList(newAmbiant);
    }
  }, [scrollPosition]);

  useEffect(() => {
    ambiant.forEach(({ context, volume, transition }) => {
      const currAudio = audioScene?.[scene]?.[context]?.audio;
      if (!currAudio) return;

      if (ambiantList?.includes(context)) {
        if (!currAudio?.isPlaying) {
          currAudio?.play();
          const newVolume = { value: currAudio?.volume };

          gsap.to(newVolume, {
            value: volume,
            duration: transition,
            onUpdate: () => {
              currAudio.setVolume(newVolume.value);
            },
          });
        }
      } else {
        if (currAudio?.isPlaying) {
          const newVolume = { value: volume };

          gsap.to(newVolume, {
            value: 0,
            duration: transition,
            onUpdate: () => {
              currAudio.setVolume(newVolume.value);
            },
            onComplete: () => {
              currAudio.pause();
            },
          });
        }
      }
    });
  }, [ambiantList, audioScene]);

  return <></>;
}
