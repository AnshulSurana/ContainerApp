import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import App from '../../App';
import mockLocalizationString from '../__mocks__/localization';
import WrappedRender from '../../../__setup__/setupTests';

jest.mock('../../components/CreditMemoListing/Listing', () =>
  jest.fn(() => <div data-testid="mockedListingPage" />)
);

jest.mock('../../components/CreditMemoDetails/CreditMemoDetailsContainer', () =>
  jest.fn(() => <div data-testid="mockedDetailsPage" />)
);

jest.mock('fe-tools', () => ({
  t: () => mockLocalizationString()
}));

jest.mock('react-query', () => ({
  useQuery: jest.fn().mockReturnValue({
    data: { nodes: [] },
    isLoading: false,
    error: {}
  })
}));

describe('App component', () => {
  it('Testing Route to Listing Page', () => {
    const store = {
      memoList: {
        creditMemos: []
      }
    };
    WrappedRender(<App />, store);

    expect(screen.getByTestId('mockedListingPage')).toBeInTheDocument();
  });

  it('Testing Route to Details Page', () => {
    window.history.pushState(
      {},
      'CreditMemoDetails',
      'https://testmarketplace.-place-.com/channel/marketplace/credit-memo/:1'
    );
    expect(global.window.location.pathname).toContain(
      'channel/marketplace/credit-memo/:1'
    );
    const store = {
      memoList: {
        creditMemos: []
      }
    };
    WrappedRender(<App />, store);

    expect(screen.getByTestId('mockedDetailsPage')).toBeInTheDocument();
  });
});
