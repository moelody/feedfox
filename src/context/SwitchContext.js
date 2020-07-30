import React, { createContext, useReducer } from "react";

export const SwitchContext = createContext(null);

export const SwitchProvider = ({ children }) => {
  const switchView = (state, action) => {
    switch(action.type) {
      case 'change':
          return {
            urls: action.urls
          }
      default: 
          return state;
      }
  }
  const [state, dispatch] = useReducer(switchView, { urls: ['https://cdn.jsdelivr.net/gh/moelody/cdn/album/黒猫_78448695.jpg'] });  

  return (
    <SwitchContext.Provider value={{ state, dispatch }}>
      {children}
    </SwitchContext.Provider>
  );
};
