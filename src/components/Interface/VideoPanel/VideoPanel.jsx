import { useContext } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';

import './VideoPanel.scss';
import { useEffect } from 'react';

import videos from './data/videos.json';
import { useState } from 'react';
import { useRef } from 'react';

export default function VideoPanel({ url = 'test.mp4' }) {
  const { scrollPosition } = useContext(InterfaceContext);
  const activeVideo = useRef();

  const videoRef = useRef();

  useEffect(() => {
    activeVideo.current = videos.map((v) => {
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
    const fStart = start + transition;
    const fEnd = end + transition;

    let res = 0;
    if (scroll < start + transition) {
      res = 1 - scroll / fStart;
    } else if (scroll > 1 - end - transition) {
      res = (scroll - (1 - end - transition)) / fEnd;
    } else if (scroll > 0 && scroll < 1) {
      videoRef.current.currentTime = scroll * videoRef.current.duration;
    }

    return res * 100;
  };

  return (
    <>
      <div
        className="vpnl-container"
        style={{
          transform: `translateY(${getTranslation()}%)`,
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
