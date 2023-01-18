import { t } from 'fe-tools';
import { ROLES } from '../../utils/roles';

export const defaultRoutes = {
  hello_microui: {
    getTitle: () => 'MicroUI',
    pathPattern: '/hello-micro-ui',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'products',
    verticalNavigationItemSelected: 'dashboard',
    RemoteMicroUIurl: '/micro-ui/hello/remoteEntry.js',
    RemoteMicroUIName: 'microui'
  },
  hello_microui_ts: {
    getTitle: () => 'MicroUI TS',
    pathPattern: '/hello-ts',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'products',
    verticalNavigationItemSelected: 'dashboard',
    RemoteMicroUIurl: '/micro-ui/hello-ts/remoteEntry.js',
    RemoteMicroUIName: 'microuits'
  },
  login: {
    getTitle: () => 'Login',
    pathPattern: '/login',
    isSecondaryNavEnabled: false,
    isTertiaryNavEnabled: false,
    autoSetup: false
  },
  hello_micro_container: {
    getTitle: () => 'Micro Container',
    pathPattern: '/hello-micro-container',
    isSecondaryNavEnabled: false,
    isTertiaryNavEnabled: false,
    autoSetup: false
  },
  poc_micro_ui_ipa_channel: {
    getTitle: () => 'POC :: MicroUI From IPA',
    pathPattern: '/channel/poc-micro-ui-from-ipa',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'marketplace',
    collectionName: 'tertiary-marketplace',
    secondaryNavItemSelected: 'marketplace',
    verticalNavigationItemSelected: 'companies',
    RemoteMicroUIurl: '/micro-ui/poc-micro-ui-from-ipa/remoteEntry.js',
    RemoteMicroUIName: 'pocMicroUIIpa',
    requiredFeatureFlag: 'reseller_poc_microuifromipa'
  },
  poc_micro_ui_ipa_reseller: {
    getTitle: () => 'POC :: MicroUI From IPA',
    pathPattern: '/reseller/poc-micro-ui-from-ipa',
    isSecondaryNavEnabled: true,
    isTertiaryNavEnabled: true,
    namespace: 'reseller',
    collectionName: 'tertiary-home',
    secondaryNavItemSelected: 'home',
    verticalNavigationItemSelected: 'resellerCompanies',
    RemoteMicroUIurl: '/micro-ui/poc-micro-ui-from-ipa/remoteEntry.js',
    RemoteMicroUIName: 'pocMicroUIIpa',
    requiredFeatureFlag: 'reseller_poc_microuifromipa'
  }
};
