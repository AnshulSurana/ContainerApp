/* istanbul ignore file */

import React, { useEffect } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { isDevelopment } from '../../config';

const DevTools = (): JSX.Element | null => {
  const [isToolbarOpen, setIsToolbarOpen] = React.useState(undefined);

  useEffect(() => {
    const toolbarStatusListener = (e: Event): void => {
      const customEvent = e as CustomEvent;
      setIsToolbarOpen(customEvent.detail?.isOpen);
    };
    document.body.addEventListener('ad-toolbar-status', toolbarStatusListener);
    return () => {
      document.body.removeEventListener(
        'ad-toolbar-status',
        toolbarStatusListener
      );
    };
  });

  return isDevelopment && isToolbarOpen !== undefined ? (
    <ReactQueryDevtools initialIsOpen={isToolbarOpen} />
  ) : null;
};
export default DevTools;
