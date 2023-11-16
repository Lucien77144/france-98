import React, { createContext, useEffect, useRef, useState } from 'react';
import { SceneContext } from './SceneProvider';
import { useContext } from 'react';

export const ActionContext = createContext(null);
/**
 * Action provider
 * @param {Object} children Children of the provider
 * @param {Object} project Project object
 * @returns
 */
function ActionProvider({ children, project }) {
  /**
   * Redirections
   */
  const [redirectionLink, setRedirectionLink] = useState('/');

  /**
   * Scroll
   */
  const canScroll = useRef(true);
  const scrollSign = useRef(0);

  // Local refs :
  const scrollTimeout = useRef(null);
  const lastScrollSign = useRef(0);

  // Scene refs :
  const { itemFocus } = useContext(SceneContext);

  // UseEffet function :
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
   * Use effect :
   */
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <ActionContext.Provider
      value={{
        setRedirectionLink,
        redirectionLink,
        canScroll,
        scrollSign,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
}

export default ActionProvider;
