import { useContext } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';

import './VideoPanel.scss';
import { useEffect } from 'react';

import videos from './data/videos.json';
import { useRef } from 'react';

export default function VideoPanel() {
  const { scrollPosition } = useContext(InterfaceContext);
  const activeVideo = useRef();

  const videoRef = useRef();

  useEffect(() => {
    activeVideo.current = videos.filter((v) => {
      if (scrollPosition >= v.start && scrollPosition <= v.end) {
        return v;
      }
    })[0];
  }, [scrollPosition]);

  const getTranslation = () => {
    if (!activeVideo.current) return 100;
    const { start, end, transition } = activeVideo.current;

    const scroll =
      Math.abs(Math.floor(((scrollPosition - start) / (end - start)) * 10000)) /
      10000;

    let res = 0;
    if (scroll > 0 && scroll < 1) {
      if (scroll < transition) {
        res = 1 - scroll / transition;
      } else if (scroll > 1 - transition) {
        res = (scroll - (1 - transition)) / transition;
      }
      videoRef.current.currentTime = scroll * (videoRef.current?.duration || 1);
    }
    return res * 100;
  };

  return (
    <>
      <div
        className="vpnl-container"
        style={{
          // transform: `translateY(${getTranslation()}%)`,
          opacity: 1 - getTranslation() / 100,
        }}
      >
        <video
          ref={videoRef}
          style={{
            transform: `scale(${1 - getTranslation() / 100 / 4})`,
          }}
          src={`../../../src/assets/video/${activeVideo?.current?.url}`}
        ></video>
      </div>
    </>
  );
}
