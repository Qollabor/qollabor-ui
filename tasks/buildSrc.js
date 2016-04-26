'use strict';

/**
 * Build and bundle the javascript app
 */
module.exports = () => {
  const tasks = {
    'build-src': {
      fn: buildSrcTask,
      description: 'Build and bundle the javascript app'
    }
  };

  function buildSrcTask(done) {
    const webpack = require('webpack');
    const gutil = require('gulp-util');

    webpack(
      require('../webpack.config.js'),
      (err, stats) => {
        if (err) {
          throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({}));
        done();
      });
  }

  return tasks;
};
