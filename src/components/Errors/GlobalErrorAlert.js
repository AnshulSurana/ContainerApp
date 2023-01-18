import React, { useState, createContext, useContext, useEffect } from 'react';
import { Alert } from 'ad-react-components/lib/Alert';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResponsiveStyle from '../../style-mixin/responsive';

const AlertContentNode = styled.div`
  display: flex;
  ${ResponsiveStyle}
`;

const init = {
  globalAlertMessage: '',
  alertType: 'error',
  setGlobalAlertMessage: () => {}
};

const GlobalErrorAlertContext = createContext(init);

export const GlobalErrorAlertContextProvider = ({
  children,
  initialMessage
}) => {
  const [globalAlertMessage, setGlobalAlertMessage] = useState(initialMessage);
  const [alertType, setAlertType] = useState('error');

  useEffect(() => {
    // usage window.dispatchEvent(new CustomEvent('ad-add-notification', { detail: { message: "Hello" } }))

    const notificationListener = (e) => {
      setAlertType(e.detail.alertType || 'error');
      setGlobalAlertMessage(e.detail.message);
    };
    document.body.addEventListener('ad-add-notification', notificationListener);
    return () => {
      document.body.removeEventListener(
        'ad-add-notification',
        notificationListener
      );
    };
  });

  return (
    <GlobalErrorAlertContext.Provider
      value={{ globalAlertMessage, setGlobalAlertMessage, alertType }}
    >
      {children}
    </GlobalErrorAlertContext.Provider>
  );
};

GlobalErrorAlertContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  initialMessage: PropTypes.node
};

GlobalErrorAlertContextProvider.defaultProps = {
  initialMessage: init.globalAlertMessage
};

export const GlobalErrorAlert = () => {
  const { globalAlertMessage, alertType } = useContext(GlobalErrorAlertContext);
  return (
    !!globalAlertMessage && (
      <Alert global state={alertType} role="alert">
        <AlertContentNode>{globalAlertMessage}</AlertContentNode>
      </Alert>
    )
  );
};

export const useGlobalAlertContext = () => useContext(GlobalErrorAlertContext);
