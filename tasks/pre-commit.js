'use strict';

/**
 * Build the complete application in the dist folder
 */
const runSequence = require('run-sequence');

module.exports = {
  fn: (gulp, config, cb) => {
    gulp.task('env-test', () => {
      process.env.NODE_ENV = 'test';
    });

    runSequence(
      'env-test',
      'test:eslint',
      'test:mocha');
    cb();
  }
};
