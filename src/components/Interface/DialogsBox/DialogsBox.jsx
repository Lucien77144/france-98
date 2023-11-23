import { useContext } from 'react';
import { InterfaceContext } from '../../../Providers/InterfaceProvider';

import './DialogsBox.scss';

import transcriptions from './data/transcriptions.json';
import COLORS from '../Colors/Colors';

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
                <li
                  className={`dgb-item ${show && 'dgb-active'}`}
                  style={{
                    background: `radial-gradient(
                      ellipse at bottom center,
                      ${COLORS.secondary + 'AC'} 0%,
                      ${COLORS.secondary + '00'} 50%,
                      ${COLORS.secondary + '00'} 100%
                    )`,
                    textShadow: `1px 1px 0px ${COLORS.primary}`,
                  }}
                  key={index}
                >
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
