'use strict';

/**
 * Build and bundle the javascript app
 */
module.exports = {
  fn: (gulp, config, cb) => {
    buildSrcTask(cb);
  }
};

function buildSrcTask(cb) {
  const webpack = require('webpack');
  const gutil = require('gulp-util');

  webpack(
    require('../../webpack.config.js'),
    (err, stats) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      cb();

      gutil.log('[webpack]', stats.toString({}));
    });
}
