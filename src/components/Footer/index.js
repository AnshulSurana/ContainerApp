import React from 'react';
import styled from 'styled-components';
import ResponsiveStyle from '../../style-mixin/responsive';

const FlexFooter = styled.div`
  flex-shrink: 0;
  .c-footer__main {
    ${ResponsiveStyle};
  }
`;

const Footer = () => (
  <FlexFooter className="universalFooter" role="contentinfo" />
);

export default Footer;
