import { css } from 'styled-components';

export default css`
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 14px;
  width: 100%;
  margin: 0 auto;
  max-width: 480px;

  @media only screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media only screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media only screen and (min-width: 1330px) {
    max-width: 1320px;
  }
`;
