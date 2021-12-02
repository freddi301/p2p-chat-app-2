import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components/macro";
import { theme } from "./theme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    color: ${(props) => props.theme.primaryTextColor};
    font-size: ${(props) => props.theme.fontSizeNormal};
    font-weight: ${(props) => props.theme.fontWeightNormal};
  }
  ::-webkit-scrollbar {
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    width: ${(props) => props.theme.scrollabrWidth};
    height: ${(props) => props.theme.scrollabrHeight};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: ${(props) => props.theme.scrollabrBorderRadius};
  }
  ::-webkit-scrollbar-corner {
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
  }
`;

type StyleProviderProps = { children: React.ReactNode };
export function StyleProvider({ children }: StyleProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
