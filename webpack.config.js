'use strict';
const config = require('config');
const webpack = require('webpack');

// Set NODE_ENV from process.env; defaults to development
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';

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
        include: /(src[\/\\]js|node_modules[\/\\]qollabor-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.jsx?$/,
        include: /(src[\/\\]js|node_modules[\/\\]qollabor-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw']
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
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      appConfig: JSON.stringify(config.clientConfig)
    }),
    new webpack.optimize.UglifyJsPlugin(config.uglify)
  ]
};
