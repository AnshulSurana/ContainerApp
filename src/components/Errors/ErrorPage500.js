import React from 'react';
import Error from 'ad-react-components/lib/Error';
import styled from 'styled-components';
import SVGIcon from 'ad-react-components/lib/SVGIcon';
import { addErrorTrace } from 'fe-tools/lib/utils/trace';

const StyledAlertIcon = styled(SVGIcon)`
  font-size: 4em;
  width: 1.1428571428571428em;
  height: 1.6428571428571428em;
  padding-top: 0.35714285714285715em;
  padding-bottom: 0.44642857142857145em;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const CenteredText = styled.div`
  text-align: center;
`;
const ErrorText = () => (
  <CenteredText>
    The page could not load because of a server error. Wait, then refresh the
    page.
    <br />
    If this error reappears, contact support.
  </CenteredText>
);

const ErrorPage500 = ({ customError = false, error = {} }) => {
  if (customError) {
    addErrorTrace(error.message, {
      source: error.source,
      type: 'errorPage'
    });
  }
  return (
    <Wrapper data-e2e="errorPage">
      <Error
        role="alert"
        style={{ padding: '10px' }}
        title="Internal Server Error (Error 500)"
        errorText={<ErrorText />}
        errorIcon={<StyledAlertIcon type="alert" />}
      />
    </Wrapper>
  );
};
export default ErrorPage500;
