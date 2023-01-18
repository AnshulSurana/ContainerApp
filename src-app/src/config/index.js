/* eslint-disable global-require */
/* tslint:disable */
/* istanbul ignore file */
// IS_DEVELOPMENT is managed by webpack.
// prettier-ignore
// @ts-expect-error
if (IS_DEVELOPMENT) { // NOSONAR
  module.exports = require("./config.dev")();
} else {
  module.exports = require("./config");
}
