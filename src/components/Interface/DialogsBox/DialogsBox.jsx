import { useContext } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';

import './DialogsBox.scss';

import transcriptions from './data/transcriptions.json';

export default function DialogsBox() {
  const { activeAudio } = useContext(InterfaceContext);

  return (
    <>
      <div className="dgb-container">
        <ul className="dgb-list">
          {transcriptions?.[activeAudio?.name]?.map(
            ({ start, end, text }, index) => {
              const progress = activeAudio?.progress;
              const show = progress >= start && progress <= end;

              return (
                <li className={`dgb-item ${show && 'dgb-active'}`} key={index}>
                  {text}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </>
  );
}
