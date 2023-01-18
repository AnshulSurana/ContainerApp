import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import t from 'fe-tools/lib/api/translate';
import styled from 'styled-components';

import Alert from 'ad-react-components/lib/Alert/Alert';
import Title from 'ad-react-components/lib/Text/Title';

import CreditMemoTable from './CreditMemoTable/CreditMemoTable';

export const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreditMemoTitle = styled(Title)`
  flex: 1;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: -10px;
  margin-top: 20px;
`;

const Listing = ({ alertMsg }) => {
  return (
    <div data-e2e="home">
      <FlexRow>
        <CreditMemoTitle data-testid="memo-title" type="xLarge">
          {t('credit.memo.title')}
        </CreditMemoTitle>
      </FlexRow>
      {!isEmpty(alertMsg) && (
        <StyledAlert data-testid="alert-msg" state={alertMsg.state}>
          {alertMsg.message}
        </StyledAlert>
      )}
      <CreditMemoTable />
    </div>
  );
};

const defaultProps = {
  alertMsg: {}
};

Listing.defaultProps = defaultProps;

const mapStateToProps = ({ alert }) => ({
  alertMsg: alert
});

export default connect(mapStateToProps, {})(Listing);
