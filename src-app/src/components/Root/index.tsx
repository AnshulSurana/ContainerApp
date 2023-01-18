import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import -place-ContextProvider from 'fe-tools/lib/providers/-place-ContextProvider';
import -place-I18nProvider from 'fe-tools/lib/providers/-place-I18nProvider';

import apolloClient from '../../utils/apollo-client';
import store from '../../store';
import App from '../../App';
import DevTools from './DevTools';
import { GlobalErrorAlertContextProvider } from '../Common/BreadCrumbs/GlobalErrorAlert';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true, // enable <Suspense>
      refetchOnWindowFocus: false, // unless you are doing a live dashboard or some other live use case
      staleTime: 3000, // won't refetch for 3 seconds
      notifyOnChangeProps: 'tracked' // only re-render if tracked properties change, will be default in V4
    }
  }
});

const Root = (): JSX.Element => {
  return (
    <GlobalErrorAlertContextProvider>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <-place-ContextProvider namespace="credit-memo-ui">
            <QueryClientProvider client={queryClient}>
              <-place-I18nProvider>
                <App />
              </-place-I18nProvider>
              <DevTools />
            </QueryClientProvider>
          </-place-ContextProvider>
        </Provider>
      </ApolloProvider>
    </GlobalErrorAlertContextProvider>
  );
};
export default Root;
