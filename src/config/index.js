/* eslint-disable global-require */

// IS_DEVELOPMENT is managed by webpack.
// prettier-ignore
if (IS_DEVELOPMENT) { // NOSONAR
  module.exports = require('./config.dev')();
} else {
  module.exports = require('./config');
}
