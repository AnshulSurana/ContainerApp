import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequiredAuth from '../components/RequiredAuth/RequiredAuth';
import RemoteMicroUIReactApp from '../components/RemoteReactComponent';
import { navigationItems } from './navigation';
import {
  getMicroUIremoteHost,
  getMicroUIremoteUrl
} from '../utils/remoteHostsStore';
import LocalDevelopmentLogin from '../components/LocalDevelopmentLogin/LocalDevelopmentLogin';
import Toolbar from '../components/Toolbar';

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/login" element={<LocalDevelopmentLogin />} />
      <Route
        path={navigationItems.hello_micro_container.pathPattern}
        element={
          <h3 data-e2e="MicroContainerPage">
            <br />
            Welcome to MicroContainer, We hope you enjoy your stay!
          </h3>
        }
      />
      {Object.values(navigationItems).map(
        ({
          autoSetup = true,
          pathPattern,
          backgroundColor,
          isLegacyLayoutPage = false,
          RemoteMicroUIurl,
          RemoteMicroUIName,
          authorizedRoles,
          requiredFeatureFlag
        }) =>
          autoSetup && (
            <Route
              key={pathPattern}
              path={pathPattern}
              element={
                <RequiredAuth
                  authorizedRoles={authorizedRoles}
                  isLegacyLayoutPage={isLegacyLayoutPage}
                  requiredFeatureFlag={requiredFeatureFlag}
                >
                  <Toolbar />
                  <div
                    id="microui-app-styles"
                    key={`styles_${RemoteMicroUIName}`}
                    style={{ display: 'none' }}
                  />
                  <RemoteMicroUIReactApp
                    backgroundColor={backgroundColor}
                    url={
                      getMicroUIremoteHost(RemoteMicroUIName) +
                      getMicroUIremoteUrl(RemoteMicroUIName, RemoteMicroUIurl)
                    }
                    name={RemoteMicroUIName}
                  />
                </RequiredAuth>
              }
            />
          )
      )}
    </Routes>
  );
};

export default RoutesList;
