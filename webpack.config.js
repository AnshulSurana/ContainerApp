const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

const env = dotenv.config().parsed;
const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};
envKeys['process.env.API_URL'] =
  envKeys['process.env.API_URL'] ||
  (process.env.API_URL
    ? JSON.stringify(process.env.API_URL)
    : JSON.stringify(''));

const outputPath = path.join(__dirname, 'dist');
const staticContentPath = path.join(__dirname, 'static');

console.error('Webpack Environment Variables', envKeys);

module.exports = (cliEnv) => {
  const isDevMode = cliEnv && cliEnv.local;
  const isTestMode = cliEnv && cliEnv.test;
  const isSmokeMode = cliEnv && cliEnv.smoke;
  const env =
    (isDevMode && 'development') ||
    ((isTestMode || isSmokeMode) && 'test') ||
    'production';
  const indexFilename =
    (isSmokeMode && './index-smoke.html') ||
    (isTestMode && './index-test.html') ||
    './index.html';

  const publicPath =
    (isDevMode && '/') ||
    (isSmokeMode && path.join('/', 'micro-container-smoke', '/')) ||
    path.join('/', 'micro-container', '/');

  // `developmentEnvironmentDomain` is the domain used to access your application.
  // This domain should be added to your host file.
  const developmentEnvironmentDomain = 'localhost';

  // `developmentMarketplaceDomain` is the domain of your target marketplace for development.
  const developmentMarketplaceDomain =
    'https://engage19billing.test.dev-place-.me';
  console.log(
    `The MP you're targeting is: ${developmentMarketplaceDomain}, update the variable 'developmentMarketplaceDomain' if you need to change the target.`
  );

  return {
    entry: {
      polyfills: './polyfills.js',
      index: './src/index.js'
    },
    performance: {
      maxAssetSize: 1000000,
      maxEntrypointSize: 4000000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader'
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[path][name]-[hash:8].[ext]'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader?modules'
            },
            {
              loader: 'sass-loader?modules'
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
        'styled-components': path.resolve(
          __dirname,
          'node_modules/styled-components'
        )
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './index.html.ejs',
        filename: indexFilename,
        templateParameters: {
          // Using the universal header sourced from the marketplace domain.
          universalNavScript: `
            <script type="text/javascript" async src="${
              isDevMode ? developmentMarketplaceDomain : ''
            }/universal-header/universal-header-global.js"></script>
            <script async type='text/javascript' src="${
              isDevMode ? developmentMarketplaceDomain : ''
            }/hermes/"></script>
          `,
          envScript: `
            <script>window.ad_micro_env="${env}";</script>
          `
        }
      }),
      new webpack.DefinePlugin({
        FONT_PATH: JSON.stringify(`${publicPath}fonts`),
        IS_DEVELOPMENT: isDevMode,
        ID_BUILD: Math.floor(Math.random() * 1000000) + 1,
        ...envKeys
      })
    ],
    devtool: isDevMode ? 'eval-source-map' : false,
    output: {
      path: outputPath,
      publicPath: publicPath,
      filename: '[name].bundle.js'
    },
    devServer: {
      open: ['http://localhost:8081/hello-micro-container'],
      hot: true,
      historyApiFallback: true,
      port: 8081,
      // Enabling serving static assets
      static: {
        directory: staticContentPath,
        publicPath
      },
      host: cliEnv && developmentEnvironmentDomain,
      allowedHosts: 'all',
      devMiddleware: {
        publicPath: '/'
      },
      proxy: {
        '/api': {
          context: () => true,
          target: developmentMarketplaceDomain,
          secure: false,
          changeOrigin: true
        }
      }
    }
  };
};
