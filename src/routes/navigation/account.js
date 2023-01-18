import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

export const accountRoutes = {
  credit_memo_account: {
    getTitle: () => t('credit-memo-title'),
    pathPattern: '/account/billing/credit-memo',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'account',
    collectionName: 'tertiary-billing',
    secondaryNavItemSelected: 'billing',
    verticalNavigationItemSelected: 'credit-memo',
    RemoteMicroUIurl: '/micro-ui/credit-memo/remoteEntry.js',
    RemoteMicroUIName: 'credit_memo',
    authorizedRoles: [ROLES.USER],
    requiredFeatureFlag: 'credit_memo_enabled'
  },
  credit_memo_details_account: {
    getTitle: () => t('credit-memo-title'),
    pathPattern: '/account/billing/credit-memo/:id',
    isSecondaryNavEnabled: true,
    secondaryNavItemSelected: 'billing',
    isTertiaryNavEnabled: false,
    namespace: 'account',
    collectionName: 'tertiary-billing',
    RemoteMicroUIurl: '/micro-ui/credit-memo/remoteEntry.js',
    authorizedRoles: [ROLES.USER],
    RemoteMicroUIName: 'credit_memo',
    requiredFeatureFlag: 'credit_memo_enabled'
  }
};
