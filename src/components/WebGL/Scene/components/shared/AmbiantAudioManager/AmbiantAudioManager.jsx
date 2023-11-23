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
    ambiant.forEach(({ context, audio }) => {
      const currAudio = audioScene?.[scene]?.[context]?.audio;
      if (ambiantList?.includes(context)) {
        if (!currAudio?.isPlaying) {
          currAudio?.play();
          gsap.to(currAudio, {
            volume: 1,
            duration: 1,
          });
        }
      } else {
        if (currAudio?.isPlaying) {
          gsap.to(currAudio, {
            volume: 0,
            duration: 1,
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
