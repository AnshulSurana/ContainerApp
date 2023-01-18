import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

const DEVELOPER_CREATE_PRODUCT_ROLES = [ROLES.DEVELOPER];

export const cmsRoutes = {
  product_uploader_ui_developer: {
    getTitle: () => t('catalog.product.uploader.page.title'),
    pathPattern: '/cms/products/uploader',
    isSecondaryNavEnabled: true,
    namespace: 'cms',
    secondaryNavItemSelected: 'products',
    isTertiaryNavEnabled: false,
    RemoteMicroUIurl: '/channel/products/uploader/remoteEntry.js',
    RemoteMicroUIName: 'productUploader',
    isLegacyLayoutPage: true,
    authorizedRoles: [ROLES.CHANNEL_ADMIN, ROLES.DEVELOPER],
    requiredFeatureFlag: 'productuploader_ui_vendor'
  },
  developer_dashboard: {
    getTitle: () => t('developer.dashboard.page.title'),
    authorizedRoles: [ROLES.DEVELOPER, ROLES.CHANNEL_ADMIN],
    pathPattern: '/vendor/admin',
    isSecondaryNavEnabled: true,
    secondaryNavItemSelected: 'developerDashboard',
    namespace: 'cms',
    backgroundColor: '#f5f5f5',
    RemoteMicroUIurl: '/micro-ui/developer-dashboard/remoteEntry.js',
    RemoteMicroUIName: 'developer_dashboard'
  },
  cms_landingpage: {
    getTitle: () => t('cms.landingpage.ui.title'),
    pathPattern: '/cms/getstarted',
    RemoteMicroUIurl: '/cms/getstarted/remoteEntry.js',
    RemoteMicroUIName: 'appdistribution_landingpage',
    isSecondaryNavEnabled: true,
    isLegacyLayoutPage: true,
    namespace: 'cms',
    secondaryNavItemSelected: 'getStarted',
    isTertiaryNavEnabled: false,
    authorizedRoles: [ROLES.CHANNEL_ADMIN]
  },
  developer_product_create: {
    getTitle: () => t('product.create.page.title'),
    authorizedRoles: DEVELOPER_CREATE_PRODUCT_ROLES,
    pathPattern: '/cms/product/create',
    isSecondaryNavEnabled: true,
    secondaryNavItemSelected: 'products',
    namespace: 'cms',
    isHeaderEnabled: true,
    isFooterEnabled: true,
    RemoteMicroUIurl: '/micro-ui/product-ui/remoteEntry.js',
    RemoteMicroUIName: 'product_ui'
  }
};
