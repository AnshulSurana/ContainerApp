import {
  getSessionStorage,
  setSessionStorage
} from 'fe-tools/lib/utils/sessionStorage';
import { useQuery } from 'react-query';
import fetchAppConfigr from 'fe-tools/lib/api/fetchAppConfigr';

const merchantRoles = [
  'CHANNEL_PRODUCT_SUPPORT',
  'CHANNEL_SUPPORT',
  'CHANNEL_ADMIN',
  'REPORTS_CHANNEL_ADMIN',
  'CORPORATE_ADMIN',
  'SALES_SUPPORT',
  'RESELLER_MANAGER',
  'SUPERUSER',
  'SUPER_SUPPORT'
];

export const isUserMerchant = (userRoles = []) =>
  userRoles.some((role) => merchantRoles.includes(role));

export const isMechantNavV2Enabled = (bootstrap, isMerchantNavV2Enabled) =>
  isMerchantNavV2Enabled &&
  isUserMerchant(bootstrap?.UserInfo?.roles) &&
  bootstrap.CHANNEL_SETTINGS.selfserveMarketplace;

const useMerchantNavV2 = (bootstrap) => {
  const cacheKey = `feature-flag-merchant-nav-v2:${bootstrap?.CHANNEL_SETTINGS?.partner}`;
  const cachedFeatureFlagValue = getSessionStorage(cacheKey);
  const { isError, isSuccess, data } = useQuery(
    `feature_flag_merchant_nav_v2`,
    () =>
      fetchAppConfigr({
        flagKey: 'merchant_nav_v2',
        entityContext: { tenant: bootstrap?.CHANNEL_SETTINGS?.partner }
      })
  );
  const isFeatureFlagFetched = isError || isSuccess;
  const isMerchantNavV2EnabledFlag =
    cachedFeatureFlagValue !== null ? cachedFeatureFlagValue : data?.variant;

  if (isFeatureFlagFetched && data?.variant !== undefined) {
    setSessionStorage(cacheKey, data?.variant);
  }

  return {
    isFeatureFlagReady: isFeatureFlagFetched || cachedFeatureFlagValue !== null,
    isMerchantNavV2Enabled: isMechantNavV2Enabled(
      bootstrap,
      isMerchantNavV2EnabledFlag
    )
  };
};

export default useMerchantNavV2;
