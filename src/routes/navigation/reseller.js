import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

export const resellerRoutes = {
  reseller_manager_dashboard: {
    getTitle: () => t('reseller.dashboard.ui.reseller.manager.title'),
    pathPattern: '/reseller/manager/dashboard',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: false,
    secondaryNavItemSelected: 'resellerManagerDashboard',
    authorizedRoles: [ROLES.RESELLER_MANAGER],
    backgroundColor: '#f5f5f5',
    namespace: 'reseller',
    RemoteMicroUIurl: '/micro-ui/reseller-dashboard-ui/remoteEntry.js',
    RemoteMicroUIName: 'resellerDashboard'
  },
  reseller_dashboard: {
    getTitle: () => t('reseller.dashboard.ui.reseller.title'),
    pathPattern: '/reseller/dashboard-v2',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: false,
    secondaryNavItemSelected: 'dashboard-v2',
    authorizedRoles: [ROLES.RESELLER],
    backgroundColor: '#f5f5f5',
    namespace: 'reseller',
    RemoteMicroUIurl: '/micro-ui/reseller-dashboard-ui/remoteEntry.js',
    RemoteMicroUIName: 'resellerDashboard'
  },
  reseller_account_ui: {
    getTitle: () => t('reseller.account.ui.title'),
    pathPattern: '/reseller/companies-v2',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'reseller',
    collectionName: 'tertiary-home',
    secondaryNavItemSelected: 'home',
    verticalNavigationItemSelected: 'resellerCompanies',
    RemoteMicroUIurl: '/micro-ui/prm-account-ui/remoteEntry.js',
    RemoteMicroUIName: 'prmaccountUI'
  }
};
