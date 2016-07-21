'use strict';
const config = require('config');
const webpack = require('webpack');
module.exports = {
  entry: [
    './src/js/app.jsx'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: /(src[\/\\]js|node_modules[\/\\]cafienne-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.jsx?$/,
        include: /(src[\/\\]js|node_modules[\/\\]cafienne-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
      },
      {
        test: /\.schema$/,
        loader: 'json'
      },
      {
        test: /\.(png|ico|gif)?$/,
        loader: 'file'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: config.webpack,
      appConfig: JSON.stringify(config.clientConfig)
    }),
    new webpack.optimize.UglifyJsPlugin(config.uglify)
  ]
};
