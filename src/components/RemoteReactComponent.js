import React, { useEffect, useRef } from 'react';

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [currentMicroUI, setCurrentMicroUI] = React.useState(args.url);

  if (currentMicroUI !== args.url) {
    setCurrentMicroUI(args.url);
    setReady(false);
    setFailed(false);
  }

  React.useEffect(() => {
    if (!args.url) {
      return;
    }
    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
      document.body.dispatchEvent(
        new CustomEvent('ad-show-error-page', {
          detail: {
            source: 'microUIStaticFiles',
            error: new Error(`MicroContainer Failed loading ${args.url}`)
          }
        })
      );
    };
    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [currentMicroUI]);

  return {
    ready,
    failed
  };
};

const setContentBgColor = (bgColor) => {
  const contentLayout = document.querySelector('.layoutContainer');
  if (contentLayout) {
    // there are some weird timing issues with the content layout
    // setTimeout helps make the page less jumpy
    window.setTimeout(() => {
      contentLayout.style.backgroundColor = bgColor || '#ffffff';
    }, 100);
  }
};

const RemoteMicroUIReactApp = ({ url, name, backgroundColor, ...props }) => {
  const { ready, failed } = useDynamicScript({ url });
  if (!ready) {
    return <></>;
  }

  if (failed) {
    return <></>;
  }

  const Component = React.lazy(async () => {
    const factory = await window[name].get('./Root');
    const Module = factory();
    return Module;
  });

  const RemoteComponent = (
    <React.Suspense fallback="">
      <Component />
    </React.Suspense>
  );

  const Container = () => {
    const containerRef = useRef(null);

    useEffect(() => {
      (async () => {
        if (window[name]) {
          const reactDomFactory = await window[name].get('./RemoteReactDom');
          const reactDom = reactDomFactory();
          if (containerRef) {
            setContentBgColor(backgroundColor);
            if (reactDom.default.createRoot) {
              // load react18
              reactDom.default
                .createRoot(containerRef.current)
                .render(RemoteComponent);
            } else {
              // load react17
              reactDom.default.render(RemoteComponent, containerRef.current);
            }
          }
        }
      })();
    }, []);

    return <div ref={containerRef} id="microUIContainer" />;
  };

  return <Container />;
};

export default RemoteMicroUIReactApp;
