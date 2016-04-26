const path = require('path');

module.exports = {
  plugins: [],
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
      }
    ]
  }
};
