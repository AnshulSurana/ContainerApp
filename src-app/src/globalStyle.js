import { normalizedCss } from 'fe-tools';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
  }
  ${normalizedCss}
`;

export default GlobalStyle;
