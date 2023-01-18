const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");

const env = dotenv.config().parsed;
const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {})
  : {};

envKeys["process.env.API_URL"] =
  envKeys["process.env.API_URL"] ||
  (process.env.API_URL
    ? JSON.stringify(process.env.API_URL)
    : JSON.stringify(""));

const APPNAME = "credit_memo";
const PORT = "7230";

const publicPath = path.join("/", "micro-ui/credit-memo", "/");
const staticContentPath = path.join(__dirname, "static");

console.error("Webpack Environment Variables", envKeys);

module.exports = (cliEnv) => {
  const isDevMode = cliEnv && cliEnv.local;

  // `developmentEnvironmentDomain` is the domain used to access your application.
  // This domain should be added to your host file.
  const developmentEnvironmentDomain = "localhost";

  // `developmentMarketplaceDomain` is the domain of your target marketplace for development.
  const developmentMarketplaceDomain =
    "https://creditmemodocbuilder.cyanopica.-place--test.io";
  console.log("Welcome to MicroUI dev environment");
  console.log("----");
  console.log(" ");
  console.info(
    `Add the following parameters to your orchard or test marketplace: ?microUIRemoteHost=http://127.0.0.1:${PORT}&microUIRemoteAppName=${APPNAME}`
  );
  console.log(" ");
  console.info(
    `Example: https://creditmemodocbuilder.cyanopica.-place--test.io/channel/marketplace/credit-memo?microUIRemoteHost=http://127.0.0.1:${PORT}&microUIRemoteAppName=${APPNAME}`
  );
  console.log(" ");
  console.log("----");
  console.log(" ");
  console.log(" ");

  return {
    entry: {
      index: "./src/index.tsx",
      polyfill: "./src/polyfill.ts",
    },
    cache: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.txt$/,
          use: {
            loader: "raw-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(pdf|jpg|png|gif|svg|ico)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[path][name]-[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devtool: isDevMode ? "eval-source-map" : false,
    plugins: [
      new webpack.DefinePlugin({
        IS_DEVELOPMENT: isDevMode,
        ...envKeys,
      }),
      new webpack.container.ModuleFederationPlugin({
        name: APPNAME,
        filename: "remoteEntry.js",
        exposes: {
          "./Root": "./src/components/Root/index",
          "./RemoteReactDom": "./src/RemoteReactDom",
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html.ejs",
        filename: "./index.html",
      }),
      new webpack.DefinePlugin({
        FONT_PATH: JSON.stringify(`${publicPath}fonts`),
        IS_DEVELOPMENT: isDevMode,
        ...envKeys
      })
    ],
    output: {
      publicPath: "auto",
      filename: "[name].bundle.js",
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
    devServer: {
      hot: true,
      historyApiFallback: {
        index: publicPath,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
      port: PORT,
      // Enabling serving static assets
      static: {
        directory: staticContentPath,
        publicPath,
      },
      host: cliEnv && developmentEnvironmentDomain,
      allowedHosts: "all",
      devMiddleware: {
        publicPath,
      },
      proxy: {
        "/api": {
          context: () => true,
          target: developmentMarketplaceDomain,
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};
