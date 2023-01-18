import React from 'react';
import styled from 'styled-components';
import {
  DARK_GRAY,
  DEEP_GRAY,
  GRAY
} from 'ad-react-components/lib/constants/colors';
import Icon from 'ad-react-components/lib/Icon';

const HyperLink = styled.a`
  background: transparent;
  outline: none;
  cursor: pointer;
  &:active,
  &:hover {
    outline: 0;
  }
`;

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 0;
`;

const Nav = styled.nav`
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
`;

const BreadcrumbWrapper = styled(Nav)`
  width: 100%;
  margin-bottom: 10px;
`;

const BreadcrumbList = styled(UnorderedList)`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  color: ${DARK_GRAY};
`;

const BreadcrumbContainer = styled.li`
  list-style: none;
  display: inline-block;
  position: relative;
  &:first-child > * {
    padding-left: 0;
  }
`;

const BreadcrumbContent = styled.span`
  display: block;
  font-size: 12px;
  padding: 8px 10px;
  color: ${DEEP_GRAY};
`;

const BreadcrumbLink = styled(BreadcrumbContent.withComponent(HyperLink))`
  transition-property: color, background;
  transition-duration: 0.1s;
  transition-timing-function: linear;
  color: ${GRAY};
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
  }
  &:hover,
  &:focus {
    color: ${DEEP_GRAY};
  }
  & ${Icon.selector}::before {
    font-size: 12px;
    color: ${GRAY};
    position: relative;
    left: 9px;
  }
`;

const BreadcrumbsItem = (props) => {
  const { children, onClick, active, ...otherProps } = props;

  return (
    <BreadcrumbContainer {...otherProps}>
      {!active && (
        <BreadcrumbLink
          data-testid="breadcrumb:item"
          onClick={() => onClick(children)}
        >
          {children}
          <Icon name="angle_right" />
        </BreadcrumbLink>
      )}
      {active && (
        <BreadcrumbContent data-testid="breadcrumb:item">
          {children}
        </BreadcrumbContent>
      )}
    </BreadcrumbContainer>
  );
};

const InternalBreadCrumb = ({ Items, onClick }) => {
  return (
    <BreadcrumbWrapper aria-label="Breadcrumb Navigation">
      <BreadcrumbList>
        {Items.map((item, i) => {
          if (Items.length - 1 === i) {
            return (
              <BreadcrumbsItem onClick={() => onClick()} key={item} active>
                {item}
                <span style={{ visibility: 'hidden' }}>
                  Current Breadcrumb:{' '}
                </span>
              </BreadcrumbsItem>
            );
          }
          return (
            <BreadcrumbsItem
              onClick={() => {
                onClick();
              }}
              key={item}
            >
              {item}
            </BreadcrumbsItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbWrapper>
  );
};

export default InternalBreadCrumb;
