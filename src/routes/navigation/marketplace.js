import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

const MARKETPLACE_CREATE_PRODUCT_ROLES = [
  ROLES.CHANNEL_ADMIN,
  ROLES.CHANNEL_PRODUCT_SUPPORT
];

export const marketplaceRoutes = {
  revenue_shares_ui: {
    getTitle: () => t('revenue.shares.ui.title'),
    pathPattern: '/channel/reconciliation/revenue-shares',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'payoutsV2',
    namespace: 'marketplace',
    authorizedRoles: [ROLES.CHANNEL_ADMIN, ROLES.CORPORATE_ADMIN],
    RemoteMicroUIurl: '/micro-ui/revenue-shares-ui/remoteEntry.js',
    RemoteMicroUIName: 'revenueSharesUI'
  },
  revenue_shares_ui_details: {
    getTitle: () => t('revenue.shares.ui.title'),
    pathPattern: '/channel/reconciliation/revenue-shares/*',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: false,
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'payoutsV2',
    namespace: 'marketplace',
    authorizedRoles: [ROLES.CHANNEL_ADMIN, ROLES.CORPORATE_ADMIN],
    RemoteMicroUIurl: '/micro-ui/revenue-shares-ui/remoteEntry.js',
    RemoteMicroUIName: 'revenueSharesUI'
  },
  product_uploader_ui_manager: {
    getTitle: () => t('catalog.product.uploader.page.title'),
    pathPattern: '/channel/products/uploader',
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'products',
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-products',
    verticalNavigationItemSelected: 'productUploader',
    RemoteMicroUIurl: '/channel/products/uploader/remoteEntry.js',
    RemoteMicroUIName: 'productUploader',
    isLegacyLayoutPage: true,
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    requiredFeatureFlag: 'productuploader_ui_mm'
  },
  product_pricebook: {
    getTitle: () => t('billing.pricebook.title'),
    pathPattern: '/channel/products/pricebooks',
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'products',
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-products',
    verticalNavigationItemSelected: 'price_book',
    RemoteMicroUIurl: '/channel/products/pricebooks/remoteEntry.js',
    RemoteMicroUIName: 'billingPriceBook',
    isLegacyLayoutPage: true,
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    requiredFeatureFlag: 'billing_pricing_enable_pricebook_ui'
  },
  product_pricebook_details: {
    getTitle: () => t('billing.pricebook.title'),
    pathPattern: '/channel/products/pricebooks/:pricebookId',
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'products',
    isTertiaryNavEnabled: false,
    RemoteMicroUIurl: '/channel/products/pricebooks/remoteEntry.js',
    RemoteMicroUIName: 'billingPriceBook',
    isLegacyLayoutPage: true,
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    requiredFeatureFlag: 'billing_pricing_enable_pricebook_ui'
  },
  subscription_tool_microui: {
    getTitle: () => t('subscriptions.tool.microui.title'),
    pathPattern: '/channel/subscription/:subscriptionUuid/tools',
    isSecondaryNavEnabled: false,
    isTertiaryNavEnabled: false,
    isLegacyLayoutPage: true,
    RemoteMicroUIurl: '/micro-ui/subscriptions-tool-microui/remoteEntry.js',
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    RemoteMicroUIName: 'subscriptions_tool_microui'
  },
  graphql_explorer_settings: {
    getTitle: () => t('graphql.explorer.settings.title'),
    pathPattern: '/channel/settings/graphql-explorer',
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'settings',
    collectionName: 'tertiary-settings',
    verticalNavigationItemSelected: 'graphqlExplorer',
    isTertiaryNavEnabled: true,
    RemoteMicroUIurl: '/micro-ui/graphql-explorer-settings/remoteEntry.js',
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    RemoteMicroUIName: 'graphql_explorer_settings'
  },
  google_transfer_micro_ui: {
    getTitle: () => t('google.transfer.tool.title'),
    pathPattern: '/channel/settings/google-transfer',
    RemoteMicroUIurl: '/micro-ui/google-transfer-micro-ui/remoteEntry.js',
    RemoteMicroUIName: 'google_transfer_micro_ui',
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'settings',
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-settings',
    verticalNavigationItemSelected: 'googleTransfer',
    requiredFeatureFlag: 'google_transfer_tool_v2'
  },
  tax_settings_ui: {
    getTitle: () => t('tax.settings.ui.title'),
    pathPattern: '/channel/marketplace/tax-settings',
    RemoteMicroUIurl: '/micro-ui/tax-settings-ui/remoteEntry.js',
    RemoteMicroUIName: 'tax_settings_ui',
    authorizedRoles: [ROLES.CHANNEL_ADMIN],
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'marketplace',
    isTertiaryNavEnabled: true,
    collectionName: 'tertiary-marketplace',
    verticalNavigationItemSelected: 'tax-settings',
    requiredFeatureFlag: 'billing_revenue_tax_settings_ui_enabled'
  },
  credit_memo: {
    getTitle: () => t('credit-memo-title'),
    pathPattern: '/channel/marketplace/credit-memo',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'credit-memo',
    RemoteMicroUIurl: '/micro-ui/credit-memo/remoteEntry.js',
    RemoteMicroUIName: 'credit_memo',
    requiredFeatureFlag: 'credit_memo_enabled'
  },
  credit_memo_details: {
    getTitle: () => t('credit-memo-title'),
    pathPattern: '/channel/marketplace/credit-memo/:id',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'credit-memo',
    RemoteMicroUIurl: '/micro-ui/credit-memo/remoteEntry.js',
    RemoteMicroUIName: 'credit_memo',
    requiredFeatureFlag: 'credit_memo_enabled'
  },
  ad_hosted_checkout_ui: {
    getTitle: () => t('checkout.settings.ui.title'),
    pathPattern: '/channel/settings/checkout/hosted',
    RemoteMicroUIurl: '/micro-ui/ad-checkout-settings/remoteEntry.js',
    RemoteMicroUIName: 'ad_checkout_settings',
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'settings',
    collectionName: 'tertiary-settings',
    verticalNavigationItemSelected: 'hosted',
    isTertiaryNavEnabled: true,
    authorizedRoles: [ROLES.CHANNEL_ADMIN]
  },
  channel_navigation_ui: {
    getTitle: () => t('navigation.manager.ui.title'),
    pathPattern: '/channel/navigation',
    RemoteMicroUIurl: '/channel/navigation/remoteEntry.js',
    RemoteMicroUIName: 'navigation_manager',
    isSecondaryNavEnabled: true,
    isLegacyLayoutPage: true,
    namespace: 'marketplace',
    secondaryNavItemSelected: 'settings',
    isTertiaryNavEnabled: false,
    authorizedRoles: [ROLES.CHANNEL_ADMIN]
  },
  graphql_explorer_ui: {
    getTitle: () => t('graphql.page.title'),
    pathPattern: '/graphql-explorer',
    RemoteMicroUIurl: '/graphql-explorer/remoteEntry.js',
    RemoteMicroUIName: 'graphql_explorer',
    isHeaderEnabled: true,
    isFooterEnabled: true,
    isLegacyStylePage: false,
    isSecondaryNavEnabled: true,
    namespace: 'marketplace',
    isTertiaryNavEnabled: false,
    authorizedRoles: [ROLES.USER],
    settings: {
      disableSecondaryNav: true
    }
  },
  channel_account_ui: {
    getTitle: () => t('channel.account.ui.title'),
    pathPattern: '/channel/companies-v2',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'companies',
    RemoteMicroUIurl: '/micro-ui/prm-account-ui/remoteEntry.js',
    RemoteMicroUIName: 'prmaccountUI'
  },
  marketplace_product_create: {
    getTitle: () => t('product.create.page.title'),
    authorizedRoles: MARKETPLACE_CREATE_PRODUCT_ROLES,
    pathPattern: '/channel/product/create',
    isSecondaryNavEnabled: true,
    secondaryNavItemSelected: 'products',
    namespace: 'marketplace',
    isHeaderEnabled: true,
    isFooterEnabled: true,
    RemoteMicroUIurl: '/micro-ui/product-ui/remoteEntry.js',
    RemoteMicroUIName: 'product_ui'
  }
};
