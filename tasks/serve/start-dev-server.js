'use strict';
const path = require('path');

module.exports = {
  fn: (gulp, config, cb) => {
    startWebpackDevServer(config);
    cb();
  }
};

function startWebpackDevServer(config) {
  const WebpackDevServer = require('webpack-dev-server');
  const gutil = require('gulp-util');
  const webpack = require('webpack');

  const myConfig = Object.create(require('../../webpack.config.js'));
  myConfig.entry.unshift('webpack/hot/only-dev-server');
  myConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080/');
  myConfig.devtool = 'eval';
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    hot: true,
    contentBase: path.join(__dirname, '../../dist/'),
    filename: 'index.js',
    progress: true,
    stats: {
      colors: true
    }
  }).listen(config.server.port, 'localhost', (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', `http://localhost:${config.server.port}/index.html`);
  });
}
