import React, { useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/GlobalStyle";
import StyledToast from "./styles/StyledToast";
import { ThemeContext } from "./context/ThemeContext";
import Routes from "./Routes";

export default () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledToast
        // position="bottom-left"
        autoClose={2000}
        closeButton={false}
      />
      <Routes />
    </StyledThemeProvider>
  );
};
