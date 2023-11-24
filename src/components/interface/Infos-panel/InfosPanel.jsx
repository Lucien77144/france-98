import { useContext } from 'react';
import { InterfaceContext } from '../../../providers/InterfaceProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import './InfosPanel.scss';
import infos from './data/infos.json';
import COLORS from '../colors/Colors';

export default function InfosPanel() {
  const { scrollPositionRef } = useContext(InterfaceContext);
  const activeInfo = useRef();
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
    activeInfo.current = infos.filter((v) => {
      if (scroll >= v.start && scroll <= v.end) {
        return v;
      }
    })[0];
  }, [scroll]);

  const getTranslation = () => {
    if (!activeInfo.current) return 100;
    const { start, end, transition } = activeInfo.current;

    const nScroll =
      Math.abs(Math.floor(((scroll - start) / (end - start)) * 10000)) / 10000;

    let res = 0;
    if (nScroll < transition) {
      res = 1 - nScroll / transition;
    } else if (nScroll > 1 - transition) {
      res = (nScroll - (1 - transition)) / transition;
    }
    return res * 100;
  };

  return (
    <>
      <div
        className="ipanel-container"
        style={{
          opacity: 1 - getTranslation() / 100,
          backgroundColor: `#00000088`,
        }}
      >
        <div className="ipanel-wrapper">
          {activeInfo.current && (
            <div className="ipanel-content">
              <h1
                className="ipanel-score"
                style={{
                  opacity: `scale(${1 - getTranslation() / 100})`,
                }}
              >
                {activeInfo.current.score}
              </h1>
              <div
                className="ipanel-flag"
                style={{
                  transform: `scale(${1 - getTranslation() / 100 / 8})`,
                }}
              >
                <h2>{activeInfo.current.title}</h2>
                <img
                  style={{
                    transform: `translate(-50%, -50%) rotate(${
                      -10 * (1 - getTranslation() / 100)
                    }deg) scale(${1 - getTranslation() / 100 / 10})`,
                  }}
                  src="assets/img/ui/france.png"
                  alt=""
                />
              </div>
              <h1
                className="ipanel-timecode"
                style={{
                  transform: `scale(${1 - getTranslation() / 100 / 6})`,
                }}
              >
                {activeInfo.current.timecode}
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
