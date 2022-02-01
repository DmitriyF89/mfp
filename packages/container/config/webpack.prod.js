const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN; // this will be defined when we build our project

const prodConfig = {
  mode: 'production', // add some optimizations to final bundle to make it run faster and have lighter weight
  output: {
    filename: '[name].[contenthash].js', // resolve caching issues with adding contenthash to filename
    publicPath: '/container/latest/', // add public path to make html webpack plugin knows where main script file is hosted inside bucket
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${domain}/marketing`, // this is should be implemented this way when we setup infrastructure
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
