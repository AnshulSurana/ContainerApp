import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

const ADMIN_ROLES = [
  ROLES.CHANNEL_ADMIN,
  ROLES.CHANNEL_SUPPORT,
  ROLES.RESELLER_MANAGER,
  ROLES.CHANNEL_PRODUCT_SUPPORT,
  ROLES.REPORTS_CHANNEL_ADMIN
];

export const adminRoutes = {
  admin_platform_manager: {
    getTitle: () => t('platform.manager.page.title'),
    authorizedRoles: ADMIN_ROLES,
    pathPattern: '/admin',
    isSecondaryNavEnabled: true,
    backgroundColor: '#f5f5f5',
    namespace: 'marketplace',
    secondaryNavItemSelected: 'platformManager',
    RemoteMicroUIurl: '/admin/remoteEntry.js',
    RemoteMicroUIName: 'platformManager'
  },
  admin_concierge: {
    getTitle: () => t('platform.onboarding.page.title'),
    authorizedRoles: ADMIN_ROLES,
    pathPattern: '/admin/welcome',
    isHeaderEnabled: false,
    isFooterEnabled: false,
    RemoteMicroUIurl: '/micro-ui/admin-concierge-ui/remoteEntry.js',
    RemoteMicroUIName: 'admin_concierge_ui'
  }
};
