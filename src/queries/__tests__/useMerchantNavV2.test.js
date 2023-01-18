import useMerchantNavV2, { isMechantNavV2Enabled } from '../useMerchantNavV2';
import * as reactquery from 'react-query';

jest.spyOn(reactquery, 'useQuery').mockReturnValue({
  isSuccess: true,
  isError: false,
  data: { variant: true }
});

describe('useMerchantNavV2 hook', () => {
  it('isMechantNavV2Enabled should return true when having the correct role and on self serve', () => {
    const bootstrap = {
      UserInfo: {
        roles: ['CHANNEL_PRODUCT_SUPPORT']
      },
      CHANNEL_SETTINGS: {
        selfserveMarketplace: true
      }
    };
    expect(isMechantNavV2Enabled(bootstrap, true)).toBe(true);
  });

  it('isMechantNavV2Enabled should return false when having the wrong role or not on self serve', () => {
    let bootstrap = {
      UserInfo: {
        roles: ['CHANNEL_PRODUCT_SUPPORT']
      },
      CHANNEL_SETTINGS: {
        selfserveMarketplace: false
      }
    };
    expect(isMechantNavV2Enabled(bootstrap, true)).toBe(false);

    bootstrap = {
      UserInfo: {
        roles: ['RESELLER']
      },
      CHANNEL_SETTINGS: {
        selfserveMarketplace: false
      }
    };
    expect(isMechantNavV2Enabled(bootstrap, true)).toBe(false);
  });

  it('useMerchantNavV2 should be ready and return true when self serve and correct role', () => {
    const bootstrap = {
      UserInfo: {
        roles: ['CHANNEL_PRODUCT_SUPPORT']
      },
      CHANNEL_SETTINGS: {
        selfserveMarketplace: true
      }
    };
    const { isFeatureFlagReady, isMerchantNavV2Enabled } =
      useMerchantNavV2(bootstrap);
    expect(isFeatureFlagReady).toBe(true);
    expect(isMerchantNavV2Enabled).toBe(true);
  });
});
