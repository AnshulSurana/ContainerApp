import React, { useEffect } from 'react';
import { isDevelopment } from '../../config/index';

const LocalDevelopmentLogin = () => {
  if (!isDevelopment) {
    window.location = '/login';
    return <></>;
  }

  return (
    <h3>
      <br />
      This path is only used in development, please update your JSESSIONID.
    </h3>
  );
};

export default LocalDevelopmentLogin;
