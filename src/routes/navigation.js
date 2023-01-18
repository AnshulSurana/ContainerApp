import { matchPath } from 'react-router';
import { adminRoutes } from './navigation/admin';
import { corporateRoutes } from './navigation/corporate';
import { defaultRoutes } from './navigation/default';
import { marketplaceRoutes } from './navigation/marketplace';
import { resellerRoutes } from './navigation/reseller';
import { paymentRoutes } from './navigation/payment';
import { cmsRoutes } from './navigation/cms';
import { adNotificationRoutes } from './navigation/adNotification';
import { accountRoutes } from './navigation/account';

export const navigationItems = {
  ...adminRoutes,
  ...corporateRoutes,
  ...defaultRoutes,
  ...marketplaceRoutes,
  ...resellerRoutes,
  ...paymentRoutes,
  ...cmsRoutes,
  ...adNotificationRoutes,
  ...accountRoutes
};

export const getNavigationItem = (path) =>
  Object.values(navigationItems).find(({ pathPattern }) =>
    matchPath(pathPattern, path)
  ) || {};

export const isInternalRedirect = (path) =>
  !!Object.values(navigationItems).find(({ pathPattern }) =>
    matchPath(pathPattern, path)
  );
