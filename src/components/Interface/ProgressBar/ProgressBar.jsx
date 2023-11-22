import { useEffect } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';
import { useContext } from 'react';

import './ProgressBar.scss';
import tracklist from '../../../components/WebGL/Scene/components/AnchorScene/data/tracklist.json';

console.log(tracklist);

export default function ProgressBar() {
  const { scrollPosition } = useContext(InterfaceContext);

  useEffect(() => {
    // console.log(Math.round(scrollPosition * 10000) / 100 + '%');
  }, [scrollPosition]);

  return (
    <>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ height: Math.round(scrollPosition * 10000) / 100 + '%' }}
        ></div>
      </div>
    </>
  );
}
