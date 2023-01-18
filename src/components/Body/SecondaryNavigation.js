import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import SecondaryNavigation from 'ad-react-components/lib/NavigationAPI/SecondaryNavigation';
import { GRAY, WHITE } from 'ad-react-components/lib/constants/colors';
import use-place-Context from 'fe-tools/lib/hooks/use-place-Context';
import ResponsiveStyles from '../../style-mixin/responsive';
import { getNavigationItem, isInternalRedirect } from '../../routes/navigation';
import useMerchantNavV2 from '../../queries/useMerchantNavV2';

const SecondaryNavigationContainer = styled.div`
  width: 100%;
  background-color: ${WHITE};
  border-bottom: 1px solid ${GRAY};

  > div {
    border-bottom: 0;
    ${ResponsiveStyles}
  }
`;

export default () => {
  const [secondaryNavItem, setSecondaryNavItem] = useState(undefined);
  const { bootstrap } = use-place-Context();
  const { isFeatureFlagReady, isMerchantNavV2Enabled } =
    useMerchantNavV2(bootstrap);

  const navigate = useNavigate();
  const location = useLocation();
  const { isSecondaryNavEnabled, namespace, secondaryNavItemSelected } =
    getNavigationItem(location.pathname);

  const handleSecondaryNavClick = ({ name, url }) => {
    setSecondaryNavItem(name);
    if (isInternalRedirect(url)) {
      navigate(url);
    } else {
      window.location = url;
    }
  };
  return isSecondaryNavEnabled &&
    isFeatureFlagReady &&
    !isMerchantNavV2Enabled ? (
    <SecondaryNavigationContainer className="secondaryNavContainer">
      <SecondaryNavigation
        namespace={namespace}
        selectedItem={secondaryNavItem || secondaryNavItemSelected || 'none'}
        locale={bootstrap?.locale}
        onItemSelect={handleSecondaryNavClick}
      />
    </SecondaryNavigationContainer>
  ) : (
    <></>
  );
};
