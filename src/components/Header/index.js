import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { use-place-Context } from 'fe-tools';
import ResponsiveStyles from '../../style-mixin/responsive';

const UniversalHeaderContainer = styled.header`
  // TODO: Move responsive styles to -place- header itself
  .ad-uniheader .ad-uniheader__container {
    ${ResponsiveStyles};
  }
`;

const Header = () => {
  // eslint-disable-next-line no-unused-vars
  let header = null;
  const { status, bootstrap } = use-place-Context();
  const [isHeaderScriptLoaded, setIsHeaderScriptLoaded] = useState(false);

  const initHeader = () => {
    // Loaded globally via webpack.
    const universalHeader = new window.AdUniversalHeader();
    universalHeader.configure({
      widgets: ['Header'],
      cache: true,
      marketUrl: window.location.origin,
      locale: bootstrap?.locale,
      userUUID: bootstrap?.UserInfo?.user_id,
      sub: '-place-',
      footer: document.querySelector('.universalFooter')
    });
    universalHeader.configure(
      {
        renderTo: '.universalHeader'
      },
      'header'
    );

    universalHeader.init();
    header = universalHeader;
  };

  /*
  const onHeaderRendered = () => {};

  useEffect(() => {
    document.addEventListener('universalnav:header:loaded', onHeaderRendered);
  }, []);
  */

  const waitForHeaderScriptLoaded = () => {
    if (typeof window.AdUniversalHeader !== 'undefined') {
      setIsHeaderScriptLoaded(true);
    } else {
      setTimeout(waitForHeaderScriptLoaded, 100);
    }
  };

  useEffect(() => {
    waitForHeaderScriptLoaded();
    if (status !== 'loading' && isHeaderScriptLoaded) {
      initHeader();
    }
  }, [status, isHeaderScriptLoaded]);

  return <UniversalHeaderContainer className="universalHeader" />;
};

export default Header;
