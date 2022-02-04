module.exports = {
  module: {
    rules: [
      // Need to register extensions of file to make webpack
      // able handle them with some extra options
      {
        test: /\.m?js$/, // regex for file extension
        exclude: /node_modules/, // folder which we don't want webpack to look at
        use: {
          // describe loader and provide settings
          loader: 'babel-loader', // loader name
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'], // presets  allows to handle jsx fro react and also transpile modern JS into ES5 syntax
            plugins: ['@babel/plugin-transform-runtime'], // Enables some different features for project inside a browser, such as async await...
          },
        },
      },
    ],
  },
};
