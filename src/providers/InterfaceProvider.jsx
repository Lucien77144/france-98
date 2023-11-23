import React, { createContext } from 'react';
import { useState } from 'react';

export const InterfaceContext = createContext(null);
export default function InterfaceProvider({ children }) {
  const [activeAudio, setActiveAudio] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [redirect, setRedirect] = useState(0);
  const [startExperience, setStartExperience] = useState(false);

  return (
    <InterfaceContext.Provider
      value={{
        activeAudio,
        scrollPosition,
        redirect,
        startExperience,

        setActiveAudio,
        setScrollPosition,
        setRedirect,
        setStartExperience,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
