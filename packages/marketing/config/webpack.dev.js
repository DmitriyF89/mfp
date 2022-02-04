const { merge } = require('webpack-merge'); // To merge webpack configs
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Ejects scripts inside some html file
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      // Allow use SPA history navigation
      index: '/index.html',
    },
  },
  output: {
    publicPath: 'http://localhost:8081/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // righter argument has more priority than lefter ones.
