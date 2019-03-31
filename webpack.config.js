var path = require('path');
var webpack = require('webpack');
// var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/javascript/browser/ordial.js',
  target: 'web',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public', 'compiled'),
    publicPath: '/public/',
    filename: 'browserBundle.js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"]
          },
        },
        test: /\.js$/,

        include: [
          path.resolve(__dirname, 'vendor'),
          path.resolve(__dirname, 'javascript'),
          path.resolve(__dirname, 'node_modules'),
        ]
      },

    ]
  }
};