import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { ViewContext } from "../context/ViewContext";
import { ViewIcon } from "./Icons";

const ToggleField = () => {
  const viewList = ['Zmage', 'Card'];
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("viewMode")
  );
  const { view, setView } = useContext(ViewContext);
  const { theme } = useContext(ThemeContext);

  const toggleView = () => {
    const nextIndex = (viewList.indexOf(currentView) + 1) % viewList.length
    setView(viewList[nextIndex]);
    setCurrentView(viewList[nextIndex]);
    localStorage.setItem("viewMode", viewList[nextIndex]);
  }

  return <ViewIcon fill={theme.accent} onClick={toggleView} />;
};

export default ToggleField;
