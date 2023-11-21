import React, { createContext } from 'react';
import { useState } from 'react';

export const InterfaceContext = createContext(null);
export default function InterfaceProvider({ children }) {
  const [activeAudio, setActiveAudio] = useState(null);

  return (
    <InterfaceContext.Provider
      value={{
        activeAudio,

        setActiveAudio,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
}
