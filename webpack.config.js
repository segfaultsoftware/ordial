var path = require('path');
var webpack = require('webpack');
// var nodeExternals = require('webpack-node-externals');

var browserConfig = {
  name: 'browserConfig',
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

var headlessServerConfig = {
  name: 'headlessServerConfig',
  entry: './src/javascript/server/controller.js',
  target: 'node',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public', 'compiled'),
    publicPath: '/public/',
    filename: 'serverBundle.js'
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

var browserTestConfig = {
  name: 'browserTestConfig',
  entry: './compiled/specEntrypoint.js',
  target: 'web',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public', 'compiled'),
    publicPath: '/public/',
    filename: 'browserTestBundle.js'
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
          path.resolve(__dirname, 'spec'),
        ]
      },

    ]
  }
};

var libraryConfig = {
  name: 'libraryConfig',
  entry: './src/javascript/lib/index.js',
  target: 'node',
  mode: 'development',
  output: {
    path: path.join(__dirname, 'public', 'compiled'),
    publicPath: '/public/',
    filename: 'ordial-core.js'
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
          path.resolve(__dirname, 'node_modules')
        ]
      },
    ]
  }
};
module.exports = [browserConfig, headlessServerConfig, browserTestConfig, libraryConfig];