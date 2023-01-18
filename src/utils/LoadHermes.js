import React, { useEffect, useState } from 'react';
import { use-place-Context } from 'fe-tools';
import instantiate from './hermes';

const LoadHermes = () => {
  const { bootstrap, status } = use-place-Context();
  const [isHermesLoaded, setIsHermesLoaded] = useState(false);

  const waitForHermesScriptLoaded = () => {
    if (typeof window.Hermes !== 'undefined') {
      setIsHermesLoaded(true);
    } else {
      setTimeout(waitForHermesScriptLoaded, 200);
    }
  };

  useEffect(() => {
    waitForHermesScriptLoaded();
    if (status !== 'loading' && isHermesLoaded) {
      instantiate(bootstrap.hermesOnInstance, bootstrap.hermesOnPartner);
    }
  }, [status, isHermesLoaded]);

  return <></>;
};

export default LoadHermes;
