import React, { createContext } from 'react';
import { useState } from 'react';

export const InterfaceContext = createContext(null);
export default function InterfaceProvider({ children }) {
  const [activeAudio, setActiveAudio] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <InterfaceContext.Provider
      value={{
        activeAudio,
        scrollPosition,

        setActiveAudio,
        setScrollPosition,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
