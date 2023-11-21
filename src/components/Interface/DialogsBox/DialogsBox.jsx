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
          {transcriptions?.[activeAudio?.name]?.map((transcription, index) => {
            const show =
              activeAudio?.progress >= transcription.start &&
              activeAudio?.progress <= transcription.end;
            return (
              <li className={`dgb-item ${show && 'dgb-active'}`} key={index}>
                {transcription.text}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
