import { useContext } from 'react';
import { InterfaceContext } from '../../../../../../providers/InterfaceProvider';
import { useEffect } from 'react';

import ambiant from './data/ambiant.json';
import { useState } from 'react';
import { SoundContext } from '../../../../../../providers/SoundProvider';
import gsap from 'gsap';

export default function AmbiantAudioManager({ scene = 'stadiumAmbiant' }) {
  const { scrollPositionRef, startExperience } = useContext(InterfaceContext);
  const { audioScene } = useContext(SoundContext);
  const [ambiantList, setAmbiantList] = useState();
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
    const newAmbiant = ambiant
      .filter(({ range }) => scroll >= range[0] && scroll <= range[1])
      .map(({ context }) => context);

    if (newAmbiant?.join('') != ambiantList?.join('')) {
      setAmbiantList(newAmbiant);
    }
  }, [scroll]);

  useEffect(() => {
    startExperience &&
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
