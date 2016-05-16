'use strict';

/**
 * Serve the development app
 */

const runSequence = require('run-sequence');

module.exports = {
  fn: (gulp, config, cb) => {
    runSequence('serve:build-project', 'serve:copy-assets', 'serve:start-dev-server');
    cb();
  }
};
