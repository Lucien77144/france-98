import React, { createContext, useEffect, useRef, useState } from 'react';

export const TemplateContext = createContext(null);
function TemplateProvider({ children, project }) {
  /**
   * Project Ref
   */
  const projectRef = useRef(project);

  /**
   * Transitions
   */
  const [inAnimTrans, setInAnimTrans] = useState(false);
  const [transEnter, setTransEnter] = useState(false);

  /**
   * Interactions
   */
  const [interactSettings, setInteractSettings] = useState({
    distance: 1000,
    dotThreshold: 0.8,
    focusDistance: 0.4,
    focusOffset: 0,
    fctIn: 'none',
    fctOut: 'none',
  });
  const interactObjs = useRef([]); // Objects that can be interacted with
  const itemFocus = useRef(null); // Object that is focused
  const [isFocus, setIsFocus] = useState(false); // Object that is focused

  /**
   * Redirections
   */
  const [redirectionLink, setRedirectionLink] = useState('/');

  /**
   * Scroll
   */
  const canScroll = useRef(true);
  const scrollSign = useRef(0);

  const scrollTimeout = useRef(null); // Local ref
  const lastScrollSign = useRef(0); // Local ref

  /**
   * UseEffect functions
   */
  const handleScroll = (evt) => {
    if (!itemFocus.current) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollSign.current = Math.sign(evt.deltaY);
      lastScrollSign.current = scrollSign.current;

      scrollTimeout.current = setTimeout(() => {
        // console.log("Le scroll s'est arrêté");
        scrollSign.current = 0;
      }, 100);
    }
  };

  /**
   * Use effect
   */
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <TemplateContext.Provider
      value={{
        projectRef,
        transEnter,
        redirectionLink,
        inAnimTrans,
        interactSettings,
        canScroll,
        interactObjs,
        itemFocus,
        scrollSign,
        isFocus,

        setTransEnter,
        setRedirectionLink,
        setInAnimTrans,
        setInteractSettings,
        setIsFocus,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export default TemplateProvider;
