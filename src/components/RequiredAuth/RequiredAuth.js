import React from 'react';
import use-place-Context from 'fe-tools/lib/hooks/use-place-Context';
import RequiredFlag from './RequireFlag';
import { anyMatchInArray } from '../../utils/anyMatchInArray';

const RequiredAuth = ({
  children,
  authorizedRoles = [],
  isLegacyLayoutPage = false,
  requiredFeatureFlag
}) => {
  const { bootstrap } = use-place-Context();
  const isAuthorized =
    authorizedRoles.length === 0 ||
    anyMatchInArray(bootstrap?.UserInfo?.roles, authorizedRoles);
  const userIsLogout = !bootstrap?.UserInfo?.roles;

  if (!isAuthorized) {
    window.location.href = userIsLogout
      ? '/login?continue=' + window.location.href
      : '/logout';
    return null;
  }

  document
    .querySelector('html')
    .classList[isLegacyLayoutPage ? 'add' : 'remove']('legacyLayoutPage');

  return requiredFeatureFlag ? (
    <RequiredFlag requiredFeatureFlag={requiredFeatureFlag}>
      {children}
    </RequiredFlag>
  ) : (
    children
  );
};

export default RequiredAuth;
