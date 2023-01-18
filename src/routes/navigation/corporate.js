import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

export const corporateRoutes = {
  revenue_shares_ui_corporate: {
    getTitle: () => t('revenue.shares.ui.title'),
    pathPattern: '/corporate/billing/revenue-shares',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-billing',
    secondaryNavItemSelected: 'billing',
    verticalNavigationItemSelected: 'revenueSharesV2',
    namespace: 'corporate',
    authorizedRoles: [ROLES.CORPORATE_ADMIN],
    RemoteMicroUIurl: '/micro-ui/revenue-shares-ui/remoteEntry.js',
    RemoteMicroUIName: 'revenueSharesUI'
  },
  revenue_shares_ui_corporate_details: {
    getTitle: () => t('revenue.shares.ui.title'),
    pathPattern: '/corporate/billing/revenue-shares/*',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: false,
    collectionName: 'tertiary-billing',
    secondaryNavItemSelected: 'billing',
    verticalNavigationItemSelected: 'revenueSharesV2',
    namespace: 'corporate',
    authorizedRoles: [ROLES.CORPORATE_ADMIN],
    RemoteMicroUIurl: '/micro-ui/revenue-shares-ui/remoteEntry.js',
    RemoteMicroUIName: 'revenueSharesUI'
  }
};
