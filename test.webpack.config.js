var path = require('path');

module.exports = {
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