import { useEffect } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';
import { useContext } from 'react';
import gsap from 'gsap';
import './ProgressBar.scss';
import { tracks } from '../../../components/WebGL/Scene/components/AnchorScene/data/tracklist.json';

function getTrackPosition({ range }) {
  return range[0] + (range[1] - range[0] / 2);
}

export default function ProgressBar() {
  const { setScrollPosition, scrollPosition, redirect, setRedirect } =
    useContext(InterfaceContext);

  useEffect(() => {
    // console.log(scrollPosition);
  }, [scrollPosition]);

  const scrollTo = (value) => {
    const duration = Math.abs(value - scrollPosition) * 8;
    const newPos = { value: scrollPosition };

    gsap.to(newPos, {
      duration,
      ease: 'power3.out',
      value,
      onUpdate: () => setRedirect(newPos.value),
    });
  };

  return (
    <>
      <div className="progress-bar-container">
        <ul className="tracks-list">
          {tracks.map((track, index) => {
            const position = track.track_position || getTrackPosition(track);
            return (
              <li
                key={index}
                style={{
                  bottom: `${position * 100}%`,
                }}
                className={`tracks-item pointer-active ${
                  position < scrollPosition ? 'tracks-item-active' : ''
                }`}
                onClick={() => scrollTo(position)}
              >
                {/* {track.context} */}
              </li>
            );
          })}
        </ul>
        <div
          className="progress-bar"
          style={{ height: scrollPosition * 100 + '%' }}
        ></div>
      </div>
    </>
  );
}
