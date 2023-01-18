import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import VerticalNavigation from 'ad-react-components/lib/NavigationAPI/VerticalNavigation';
import Notification from 'ad-react-components/lib/Notification';
import { AlertsContainer } from 'fe-tools/lib/components/AlertsContainer';
import { use-place-Context } from 'fe-tools';
import SecondaryNavigation from './SecondaryNavigation';
import ResponsiveStyles from '../../style-mixin/responsive';
import { GlobalErrorAlert } from '../Errors/GlobalErrorAlert';
import { getNavigationItem } from '../../routes/navigation';
import RoutesList from '../../routes/routes';

const FlexLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-bottom: 24px;
  background-color: #fff;
  transition: background 2s;
  min-height: 100%;
`;

const FlexRow = styled.div`
  display: inline-flex;
  padding-top: 24px !important;
  ${ResponsiveStyles}
`;

const Content = styled.div`
  margin-left: ${({ isTertiaryNavEnabled }) =>
    isTertiaryNavEnabled ? '24px' : '0px'};
  flex: 1;
`;

const StyledVerticalNavigation = styled(VerticalNavigation)`
  align-self: flex-start;
`;

const setFavIcon = (icon) => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link && icon) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
    link.href = icon;
  }
};

const setPageTitle = (pageName, companyName) => {
  document.title = `${pageName} | ${companyName}`;
};

export const Body = () => {
  const [sideNavItem, setSideNavItem] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const { bootstrap } = use-place-Context();
  const {
    isTertiaryNavEnabled = false,
    namespace,
    collectionName,
    verticalNavigationItemSelected,
    getTitle
  } = getNavigationItem(location.pathname);
  setPageTitle((getTitle && getTitle()) || '', bootstrap?.CompanyInfo?.name);
  setFavIcon(bootstrap?.CHANNEL_SETTINGS?.customFavicon);

  const handleSideNavClick = ({ name, url }) => {
    setSideNavItem(name);
    if (getNavigationItem(url).pathPattern) {
      navigate(url);
    } else {
      window.location = url;
    }
  };

  return (
    <FlexLayout className="layoutContainer">
      <SecondaryNavigation />
      <GlobalErrorAlert />
      <AlertsContainer CustomToast={Notification} />
      <FlexRow className="mainContentLayout">
        {isTertiaryNavEnabled && (
          <StyledVerticalNavigation
            namespace={namespace}
            collectionName={collectionName}
            locale={bootstrap?.locale}
            selectedItem={sideNavItem || verticalNavigationItemSelected}
            onItemSelect={handleSideNavClick}
          />
        )}
        <Content isTertiaryNavEnabled={isTertiaryNavEnabled}>
          <RoutesList />
        </Content>
      </FlexRow>
    </FlexLayout>
  );
};

export default Body;
