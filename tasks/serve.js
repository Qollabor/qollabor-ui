'use strict';
const path = require('path');

/**
 * Serve the development app
 */
module.exports = (gulp, config) => {
  const tasks = {
    serve: {
      description: `Serve the development app on port ${config.server.port}`,
      seq: [
        'build',
        'watchAssets',
        function () {
          const WebpackDevServer = require('webpack-dev-server');
          const gutil = require('gulp-util');
          const webpack = require('webpack');

          const myConfig = Object.create(require('../webpack.config.js'));
          myConfig.entry.unshift('webpack/hot/only-dev-server');
          myConfig.entry.unshift(`webpack-dev-server/client?http://localhost:${config.server.port}/`);
          myConfig.devtool = 'eval';
          myConfig.debug = true;

          // Start a webpack-dev-server
          new WebpackDevServer(webpack(myConfig), {
            hot: true,
            contentBase: path.join(__dirname, '../dist/'),
            filename: 'index.js',
            progress: true,
            stats: {
              colors: true
            }
          }).listen(config.server.port, '0.0.0.0', (err) => {
            if (err) {
              throw new gutil.PluginError('webpack-dev-server', err);
            }
            gutil.log('[webpack-dev-server]', `http://localhost:${config.server.port}/index.html`);
          });
        }
      ]
    }
  };
  return tasks;
};
