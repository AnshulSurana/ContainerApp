import React, { useState, createContext, useContext, useMemo } from 'react';
import { Alert } from 'ad-react-components/lib/Alert';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ResponsiveStyle from '../style-mixin/responsive';

const AlertContentNode = styled.div`
  display: flex;
  ${ResponsiveStyle}
`;

// Margins match values used for SecondaryNavigation.js
const StyledAlert = styled(Alert)`
  margin-top: -24px;
  margin-bottom: 24px;
`;

const init = {
  globalAlertMessage: ''
};

const GlobalErrorAlertContext = createContext(init);

export const GlobalErrorAlertContextProvider = ({
  children,
  initialMessage
}) => {
  const [globalAlertMessage, setGlobalAlertMessage] = useState(initialMessage);

  const value = useMemo(
    () => ({
      globalAlertMessage,
      setGlobalAlertMessage
    }),
    [globalAlertMessage]
  );

  return (
    <GlobalErrorAlertContext.Provider value={value}>
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
  const { globalAlertMessage } = useContext(GlobalErrorAlertContext);
  return (
    !!globalAlertMessage && (
      <StyledAlert global state="error">
        <AlertContentNode>{globalAlertMessage}</AlertContentNode>
      </StyledAlert>
    )
  );
};

export const useGlobalAlertContext = () => useContext(GlobalErrorAlertContext);
