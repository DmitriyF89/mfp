const { merge } = require('webpack-merge'); // To merge webpack configs
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      // Allow use SPA history navigation
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'Container',
      remotes: {
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
      },
      shared: packageJson.dependencies, // Convenient way to share all deps from package.json
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // righter argument has more priority than lefter ones.
