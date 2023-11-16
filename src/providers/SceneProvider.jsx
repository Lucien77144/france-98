import React, { createContext, useRef, useState } from 'react';

export const SceneContext = createContext(null);

/**
 * Scene provider
 * @param {Object} children Children of the provider
 * @param {Object} project Project object
 * @returns
 */
function SceneProvider({ children, project }) {
  const [inAnimTrans, setInAnimTrans] = useState(false);
  const [transEnter, setTransEnter] = useState(false);
  const [interactSettings, setInteractSettings] = useState({
    distance: 40,
    dotThreshold: 0.95,
    focusDistance: 6,
    focusOffset: 0,
    fctIn: 'none',
    fctOut: 'none',
  });
  const itemFocus = useRef(null);
  const interactObjs = useRef([]);
  const projectRef = useRef(project);

  return (
    <SceneContext.Provider
      value={{
        transEnter,
        inAnimTrans,
        interactSettings,
        interactObjs,
        projectRef,
        itemFocus,

        setTransEnter,
        setInAnimTrans,
        setInteractSettings,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export default SceneProvider;
