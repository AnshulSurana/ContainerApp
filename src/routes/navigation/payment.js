import { t } from 'fe-tools';

export const paymentRoutes = {
  metamask_payment_ui: {
    getTitle: () => t('payment.metamask.page.title'),
    pathPattern: '/payment/metamask',
    isSecondaryNavEnabled: false,
    isTertiaryNavEnabled: false,
    isHeaderEnabled: false,
    isFooterEnabled: false,
    RemoteMicroUIurl: '/micro-ui/metamask-payment-ui/remoteEntry.js',
    RemoteMicroUIName: 'metamask_payment_ui'
  }
};
