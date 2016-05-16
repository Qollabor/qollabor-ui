'use strict';

/**
 * Build the complete application in the dist folder
 */

const runSequence = require('run-sequence');

module.exports = {
  fn: (gulp, config, cb) => {
    runSequence('serve:clean-dist', 'serve:copy-css', 'serve:build-src', 'serve:copy-html');
    cb();
  }
};
