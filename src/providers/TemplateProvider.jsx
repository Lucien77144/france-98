import React, { createContext, useEffect, useRef, useState } from 'react';

export const TemplateContext = createContext(null);

function TemplateProvider({ children, project }) {
  const [inAnimTrans, setInAnimTrans] = useState(false);
  const [transEnter, setTransEnter] = useState(false);
  const [redirectionLink, setRedirectionLink] = useState('/');
  const [interactSettings, setInteractSettings] = useState({
    distance: 40,
    dotThreshold: 0.95,
    focusDistance: 6,
    focusOffset: 0,
    fctIn: 'none',
    fctOut: 'none',
  });
  const itemFocus = useRef(null);
  const canScroll = useRef(true);
  const interactObjs = useRef([]);
  const projectRef = useRef(project);
  const scrollTimeout = useRef(null);
  const scrollSign = useRef(0);
  const lastScrollSign = useRef(0);
  const handleScroll = (e) => {
    if (!itemFocus.current) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollSign.current = Math.sign(e.deltaY);
      lastScrollSign.current = scrollSign.current;
      scrollTimeout.current = setTimeout(() => {
        console.log("Le scroll s'est arrêté");
        scrollSign.current = 0;
      }, 100);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <TemplateContext.Provider
      value={{
        setTransEnter,
        setRedirectionLink,
        setInAnimTrans,
        setInteractSettings,
        transEnter,
        redirectionLink,
        inAnimTrans,
        interactSettings,
        canScroll,
        interactObjs,
        projectRef,
        itemFocus,
        scrollSign,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export default TemplateProvider;
