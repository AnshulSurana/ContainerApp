import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as feTools from 'fe-tools';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router';
import Body from '..';
import { SECONDARY_NAV_NAVIGATION_RESULT } from '../../../queries/mocks/navigation';
import { GlobalErrorAlertContextProvider } from '../../Errors/GlobalErrorAlert';

enableFetchMocks();

const tenant = 'APPSMART';
const locale = 'en_US';
const bootstrapResponse = {
  UserInfo: { locale },
  CHANNEL_SETTINGS: { partner: tenant, customFavicon: 'url' },
  CompanyInfo: {
    name: '-place-'
  },
  locale
};

jest.mock(
  'ad-react-components/lib/Progress/ProgressCircle',
  () => jest.fn().mockImplementation(() => null)
  // eslint-disable-next-line function-paren-newline
);

jest.mock('fe-tools/lib/hooks/use-place-Context', () =>
  jest.fn(() => ({
    bootstrap: bootstrapResponse
  }))
);
jest
  .spyOn(feTools, 'useNavigation')
  .mockReturnValue(SECONDARY_NAV_NAVIGATION_RESULT);

jest.spyOn(feTools, 't').mockImplementation((word) => word);

fetch.mockResponse(JSON.stringify(bootstrapResponse));

jest.mock('../../../queries/useMerchantNavV2', () =>
  jest.fn(() => ({
    isFeatureFlagReady: true,
    isMerchantNavV2Enabled: true
  }))
);

describe('Body', () => {
  const createComponent = (props = {}, path = '/hello-micro-ui') => (
    <MemoryRouter initialEntries={[path]}>
      <GlobalErrorAlertContextProvider>
        <Body {...props} />
      </GlobalErrorAlertContextProvider>
    </MemoryRouter>
  );

  it('should render the title', async () => {
    render(createComponent());
    await waitFor(() => {
      expect(document.title).toEqual('MicroUI | -place-');
    });
  });

  it('renders the micro container page', async () => {
    render(createComponent({}, '/hello-micro-container'));
    await waitFor(() => {
      expect(
        screen.getByText('Welcome to MicroContainer', { exact: false })
      ).toBeVisible();
    });
  });

  it('renders error banner when receiving an error', async () => {
    render(createComponent({}, '/hello-micro-container'));
    fireEvent(
      document.body,
      new CustomEvent('ad-add-notification', {
        detail: { message: 'Error Message' }
      })
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeDefined();
    });
  });
});
