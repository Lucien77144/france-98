import React, { createContext, useEffect, useRef, useState } from 'react';

export const ActionContext = createContext(null);

function handleScroll(evt) {
  if (!itemFocus.current) {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollSign.current = Math.sign(evt.deltaY);
    lastScrollSign.current = scrollSign.current;
    scrollTimeout.current = setTimeout(() => {
      console.log("Le scroll s'est arrêté");
      scrollSign.current = 0;
    }, 100);
  }
}

/**
 * Action provider
 * @param {Object} children Children of the provider
 * @param {Object} project Project object
 * @returns
 */
function ActionProvider({ children, project }) {
  const [redirectionLink, setRedirectionLink] = useState('/');

  return <ActionContext.Provider value={{}}>{children}</ActionContext.Provider>;
}

export default ActionProvider;
