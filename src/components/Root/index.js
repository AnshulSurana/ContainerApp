import React, { useEffect, useState } from 'react';
import { GlobalStyle } from 'ad-react-components/lib/GlobalStyles';
import { -place-ContextProvider, use-place-Context } from 'fe-tools';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useLocation, useNavigate } from 'react-router';
import Body from '../Body';
import Footer from '../Footer';
import Header from '../Header';
import ErrorPage500 from '../Errors/ErrorPage500';
import { GlobalErrorAlertContextProvider } from '../Errors/GlobalErrorAlert';
import { getNavigationItem } from '../../routes/navigation';
import LoadHermes from '../../utils/LoadHermes';
import { addErrorTrace } from 'fe-tools/lib/utils/trace';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FlexHeaderAndBody = styled.div`
  flex: 1 0 auto;
`;

// Unique ID help caching information in session storage
let UNIQUE_ID_BUILD;
try {
  /* eslint-disable global-require */
  /* tslint:disable */
  /* istanbul ignore file */
  // UUID_BUILD is managed by webpack.
  // prettier-ignore
  // @ts-expect-error - UUID_BUILD is managed by webpack.
  UNIQUE_ID_BUILD = `${ID_BUILD}`;
} catch (e) {
  console.log(e);
}

export const RootContent = () => {
  const [showErrorPage, setShowErrorPage] = useState(false);
  const { status, bootstrap, tenant } = use-place-Context();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    pathPattern,
    RemoteMicroUIName,
    isSecondaryNavEnabled,
    namespace,
    secondaryNavItemSelected,
    isHeaderEnabled = true,
    isFooterEnabled = true,
    settings = {}
  } = getNavigationItem(location.pathname);
  const isPathInMicroContainer = !!pathPattern;

  if (isSecondaryNavEnabled) {
    window.ad_namespace = namespace;
    window.ad_secondaryNavSelected = secondaryNavItemSelected;
  }

  if (status !== 'loading') {
    window.bootstrapData = {};
    window.bootstrapData.bootstrap = bootstrap;
    window.adTenant = tenant;
    window.adLocale = bootstrap?.locale;
  }
  window.ad_micro_app = RemoteMicroUIName;
  window.ad_micro_app_settings = settings;

  useEffect(() => {
    setShowErrorPage(!isPathInMicroContainer);
    if (!isPathInMicroContainer) {
      console.log('Path not found, triggering error page', pathPattern);
    }
  }, [isPathInMicroContainer]);

  useEffect(() => {
    const navigationListener = (e) => {
      const path = e.detail?.path;
      if (path) {
        if (getNavigationItem(path).pathPattern) {
          navigate(path);
          setShowErrorPage(false);
        } else {
          window.location = path;
        }
      }
    };
    const showErrorPageListener = (e) => {
      setShowErrorPage(true);
      addErrorTrace(e.detail.error, {
        source: e.detail?.source,
        type: 'errorPage'
      });
    };
    document.body.addEventListener('ad-navigate', navigationListener);
    document.body.addEventListener('ad-show-error-page', showErrorPageListener);
    return () => {
      document.body.removeEventListener('ad-navigate', navigationListener);
      document.body.removeEventListener(
        'ad-show-error-page',
        showErrorPageListener
      );
    };
  });

  return !showErrorPage ? (
    <RootContainer>
      <FlexHeaderAndBody>
        {isHeaderEnabled && <Header />}
        <Body />
      </FlexHeaderAndBody>
      {isFooterEnabled && <Footer />}
    </RootContainer>
  ) : (
    <ErrorPage500 />
  );
};

const Root = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 3000
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalErrorAlertContextProvider>
        <GlobalStyle basePath={FONT_PATH} />
        <-place-ContextProvider
          namespace="micro-container"
          errorPage={
            <ErrorPage500
              customError={true}
              error={{
                source: 'bootstrapFailed',
                message: new Error(
                  '-place-ContextProvider Bootstrap or Localization failed'
                )
              }}
            />
          }
          buildId={UNIQUE_ID_BUILD}
        >
          <LoadHermes />
          <RootContent />
        </-place-ContextProvider>
      </GlobalErrorAlertContextProvider>
    </QueryClientProvider>
  );
};

export default Root;
