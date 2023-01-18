import { normalizedCss } from 'fe-tools';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
  }
  #footer .wrapper, .adb-layout-default, .adb-layout-form, .wrapper {
    margin: 0 auto;
  }
  *[class*="adb-"] {
    box-sizing: border-box;
  }

  @media only screen and (min-width: 992px) {
    #footer .wrapper, .adb-layout-default, .wrapper {
        width: 960px;
    }
  }
  @media only screen and (min-width: 1330px) {
    #footer .wrapper, .adb-layout-default, .wrapper {
        width: 1320px;
    }
  }


  .legacyLayoutPage {
    .secondaryNavContainer > div {
      padding-left: 0px;
      padding-right: 0px;
    }

    .ad-uniheader .ad-uniheader__container {
      padding-left: 0px;
      padding-right: 0px;
    }

    #footer .wrapper, .adb-layout-default, .wrapper {
        width: 984px;
    }

    @media only screen and (min-width: 1280px) {
      #footer .wrapper, .adb-layout-default, .wrapper {
          width: 1128px;
      }
    }
    .mainContentLayout {
      max-width: 984px!important;

      @media only screen and (min-width: 1280px) {
        max-width: 1128px!important;
      }
    }
    .secondaryNavContainer {
      > div {
        max-width: 984px!important;

        @media only screen and (min-width: 1280px) {
          max-width: 1128px!important;
        }
      }
    }

  }
  ${normalizedCss}
`;

export default GlobalStyle;
