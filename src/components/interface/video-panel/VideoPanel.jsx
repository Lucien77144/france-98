import { useContext } from 'react';
import { InterfaceContext } from '../../../providers/InterfaceProvider';

import './VideoPanel.scss';
import { useEffect } from 'react';

import videos from './data/videos.json';
import { useRef } from 'react';
import { useState } from 'react';

export default function VideoPanel() {
  const { scrollPositionRef } = useContext(InterfaceContext);
  const activeVideo = useRef();
  const videoRef = useRef();
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
    activeVideo.current = videos.filter((v) => {
      if (scroll >= v.start && scroll <= v.end) {
        return v;
      }
    })[0];
  }, [scroll]);

  const getTranslation = () => {
    if (!activeVideo.current) return 100;
    const { start, end, transition } = activeVideo.current;

    const nScroll =
      Math.abs(Math.floor(((scroll - start) / (end - start)) * 10000)) / 10000;

    let res = 0;
    if (nScroll < transition) {
      res = 1 - nScroll / transition;
    } else if (nScroll > 1 - transition) {
      res = (nScroll - (1 - transition)) / transition;
    }
    videoRef.current.currentTime = nScroll * (videoRef.current?.duration || 1);
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
