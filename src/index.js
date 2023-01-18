import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import GlobalStyle from './globalStyle';
import { storeMicroUIremoteHost } from './utils/remoteHostsStore';

storeMicroUIremoteHost();

const root = createRoot(document.querySelector('#app'));
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Root />
  </BrowserRouter>
);
