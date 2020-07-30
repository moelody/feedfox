import React, { createContext, useState } from "react";

export const ViewContext = createContext(null);

export const ViewProvider = ({ children }) => {
  const localSt = localStorage.getItem("viewMode");
  const [view, setView] = useState(localSt ? localSt : "Card");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
