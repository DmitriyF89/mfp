const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.vue'], // add .vue extension for webpack handling
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss|.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
      },
      // Need to register extensions of file to make webpack
      // able handle them with some extra options
      {
        test: /\.m?js$/, // regex for file extension
        exclude: /node_modules/, // folder which we don't want webpack to look at
        use: {
          // describe loader and provide settings
          loader: 'babel-loader', // loader name
          options: {
            presets: ['@babel/preset-env'], // presets  allows to handle jsx fro react and also transpile modern JS into ES5 syntax
            plugins: ['@babel/plugin-transform-runtime'], // Enables some different features for project inside a browser, such as async await...
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
