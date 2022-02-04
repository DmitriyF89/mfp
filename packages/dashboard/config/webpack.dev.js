const { merge } = require('webpack-merge'); // To merge webpack configs
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Ejects scripts inside some html file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8083,
    historyApiFallback: {
      // Allow use SPA history navigation
      index: '/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*', // This need to allow downloading fonts and some other stuff when running app inside container
    },
  },
  output: {
    publicPath: 'http://localhost:8083/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // righter argument has more priority than lefter ones.
