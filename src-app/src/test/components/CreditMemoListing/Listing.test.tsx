import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';

import Listing from '../../../components/CreditMemoListing/Listing';
import mockLocalizationString from '../../__mocks__/localization';
import WrappedRender from '../../../../__setup__/setupTests';

jest.mock(
  '../../../components/CreditMemoListing/CreditMemoTable/CreditMemoTable',
  () => jest.fn(() => <div data-testid="mockedTableComponent" />)
);
jest.mock('fe-tools', () => ({
  t: () => mockLocalizationString()
}));

const tenant = 'APPSMART';
const locale = 'en_US';
const bootstrapResponse = {
  UserInfo: { locale },
  CHANNEL_SETTINGS: { partner: tenant },
  CompanyInfo: {},
  locale
};
enableFetchMocks();
const store = {
  memoList: {
    creditMemos: []
  }
};
fetch.mockResponse(JSON.stringify(bootstrapResponse));
describe('Listing component', () => {
  it('Should test Listing Component rendering', () => {
    WrappedRender(<Listing />, store);

    expect(screen.getByTestId('mockedTableComponent')).toBeInTheDocument();
  });
});
