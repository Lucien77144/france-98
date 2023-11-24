import { useEffect } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';
import { useContext } from 'react';
import gsap from 'gsap';
import './ProgressBar.scss';
import { tracks } from '../../webgl/scene/components/anchor-scene/data/tracklist.json';
import COLORS from '../colors/Colors';
import { useState } from 'react';

function getTrackPosition({ range }) {
  return range[0] + (range[1] - range[0] / 2);
}

export default function ProgressBar() {
  const { scrollPositionRef, setRedirect } = useContext(InterfaceContext);
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

  const scrollTo = (value) => {
    const duration = Math.abs(value - scroll) * 8;
    const newPos = { value: scroll };

    gsap.to(newPos, {
      duration,
      ease: 'power3.out',
      value,
      onUpdate: () => setRedirect(newPos.value),
    });
  };

  return (
    <>
      <div
        className="progress-bar-container"
        style={{
          backgroundColor: COLORS.primary + '22',
        }}
      >
        <ul className="progress-bar-list">
          {tracks.map((track, index) => {
            const position = track.track_position || getTrackPosition(track);
            return (
              <li
                key={index}
                style={{
                  bottom: `${position * 100}%`,
                  ...(position < scroll && {
                    backgroundColor: COLORS.primary,
                  }),
                }}
                className={`progress-bar-item pointer-active ${
                  position < scroll ? 'progress-bar-item-active' : ''
                }`}
                onClick={() => scrollTo(position)}
              ></li>
            );
          })}
        </ul>
        <div
          className="progress-bar"
          style={{
            height: scroll * 100 + '%',
            backgroundColor: '#ffffff49',
          }}
        ></div>
      </div>
    </>
  );
}
