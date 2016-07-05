const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin(/^(buffertools)$/),
    new webpack.DefinePlugin({
      ENV: {
        logDispatcher: true
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json-loader'
      },
      {
        test: /\.js?$/,
        include: /(src\/js|node_modules\/cafienne-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.jsx?$/,
        include: /(src\/js|node_modules\/cafienne-ui-elements)/,
        loader: 'babel'
      },
      {
        test: /\.schema$/,
        loader: 'json'
      }
    ]
  }
};
