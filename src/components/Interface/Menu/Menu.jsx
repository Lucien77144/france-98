import COLORS from '../Colors/Colors';
import './Menu.scss';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Menu({ intro }) {
  const { startExperience, setStartAudio } = useContext(InterfaceContext);
  const [hoverStart, setHoverStart] = useState();
  const [startVideo, setStartVideo] = useState(false);
  const videoRef = useRef();

  const startExp = () => {
    setStartVideo(true);
    if (intro) {
      videoRef.current.play();
      videoRef.current.addEventListener('ended', () => {
        setStartAudio(true);
      });
    } else {
      setStartAudio(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.primary,
        opacity: !startExperience ? 1 : 0,
        pointerEvents: !startExperience ? 'all' : 'none',
      }}
      className={`menu ${hoverStart ? 'menu-hover' : ''} ${
        startVideo ? 'start-video' : ''
      }`}
    >
      <div className="menu-wrapper">
        <div className="start">
          <div
            className={`start-action pointer-active ${
              startExperience ? 'start-action-disabled' : ''
            }`}
            onMouseEnter={() => setHoverStart(true)}
            onMouseLeave={() => setHoverStart(false)}
            onClick={() => startExp()}
          >
            Start ⚽️ 👉 🥅
          </div>
        </div>
        <div className="scroll-action">
          <img src="./src/assets/img/ui/scroll.svg"></img>
          Scroll to explore
        </div>
      </div>
      <div className="names">Victor - Lucien - Ariste - Chanel</div>
      {intro && (
        <video
          ref={videoRef}
          className="intro-video"
          src={`./src/assets/video/${intro}`}
        ></video>
      )}
    </div>
  );
}
