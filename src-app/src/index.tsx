import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from './components/Root';

declare global {
  // eslint-disable-next-line
  interface Window {
    startMicroUI: () => void;
  }
}

const startApplication = (): void => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<Root />);
};

window.startMicroUI = startApplication;
