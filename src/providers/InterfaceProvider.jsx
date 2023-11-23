import React, { createContext } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export const InterfaceContext = createContext(null);
export default function InterfaceProvider({ children }) {
  const [activeAudio, setActiveAudio] = useState(null);
  const [redirect, setRedirect] = useState(0);
  const [startExperience, setStartExperience] = useState(false);
  const scrollPositionRef = useRef(0);

  return (
    <InterfaceContext.Provider
      value={{
        activeAudio,
        scrollPositionRef,
        redirect,
        startExperience,

        setActiveAudio,
        setRedirect,
        setStartExperience,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
