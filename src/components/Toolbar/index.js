import Icon from 'ad-react-components/lib/Icon';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledToolbar = styled.div`
  position: fixed;
  z-index: 10;
  top: 100px;
  right: 20px;
  color: #fff;
  background: rgb(46, 49, 41);
  padding: 10px;
  border-radius: 5px;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const StyledButtonToolbar = styled.a`
  display: inline-block;
  padding: 5px 8px;
  margin: -5px;
  cursor: pointer;
`;
const StyledExtendedToolbar = styled.div`
  width: 200px;
`;
const ListItem = styled.div`
  display: block;
  height: 35px;
  line-height: 35px;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const CloseListItem = styled(ListItem)`
  text-align: right;
`;
const ListItemDescription = styled.div`
  background: #5c5d58;
  margin: 0 -10px;
  padding: 10px;
`;

const ListItemLine = styled.div`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDisconnectButton = styled.a`
  color: #fff;

  cursor: pointer;
  display: inline-block;
  text-align: center;
  padding: 5px;
  border: 1px solid #fff;
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
const BottomTools = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
`;

const getDevMicroUIs = () => {
  const microUIs = [];
  Object.keys(window.sessionStorage).forEach((key) => {
    if (key.includes('micro_')) {
      microUIs.push({
        name: key.replace('micro_', '').replace('_host', ''),
        url: window.sessionStorage.getItem(key)
      });
    }
  });
  return microUIs;
};

const Toolbar = () => {
  const microUIs = getDevMicroUIs();
  const [showExtendedToobar, setShowExtendedToobar] = useState(false);
  const showToolbar =
    microUIs.length >= 1 && window.ad_micro_env !== 'production';

  const ButtonToolbar = () => {
    return (
      <StyledButtonToolbar
        role="button"
        onClick={() => {
          setShowExtendedToobar(!showExtendedToobar);
          document.body.dispatchEvent(
            new CustomEvent('ad-toolbar-status', {
              detail: { isOpen: !showExtendedToobar }
            })
          );
        }}
      >
        <Icon name="tools" />
      </StyledButtonToolbar>
    );
  };
  const disconnectMicroUIs = () => {
    microUIs.forEach((microUI) => {
      window.sessionStorage.clear(`micro_${microUI.name}_host`);
    });
    window.location.reload();
  };

  const ExtendedToolbar = () => {
    return (
      <StyledExtendedToolbar>
        <CloseListItem>
          <a onClick={() => setShowExtendedToobar(!showExtendedToobar)}>
            Close
          </a>{' '}
          <Icon name="angle_double_right" />
        </CloseListItem>
        <ListItem>
          <Icon name="book" />{' '}
          <a
            href="https://-place-.jira.com/wiki/spaces/EN/pages/3110928385/Micro+UI+-+Draft"
            target="_blank"
          >
            Documentation
          </a>
        </ListItem>
        <ListItem>
          <Icon name="reseller" /> Connected MicroUIs
        </ListItem>
        {microUIs.map((microUI) => (
          <ListItemDescription key={`toolbar_${microUI.name}`}>
            <ListItemLine>Name: {microUI.name}</ListItemLine>
            <ListItemLine>Host: {microUI.url}</ListItemLine>
          </ListItemDescription>
        ))}
        <BottomTools>
          <StyledDisconnectButton onClick={() => disconnectMicroUIs()}>
            Disconnect All
          </StyledDisconnectButton>
        </BottomTools>
      </StyledExtendedToolbar>
    );
  };
  return showToolbar ? (
    <StyledToolbar>
      {showExtendedToobar ? (
        <ExtendedToolbar />
      ) : (
        <ButtonToolbar></ButtonToolbar>
      )}
    </StyledToolbar>
  ) : null;
};
export default Toolbar;
