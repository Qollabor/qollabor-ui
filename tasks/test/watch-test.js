'use strict';

/**
 * Run the tests after a source file is changed
 */
module.exports = {
  fn: (gulp, config, cb) => {
    watchClient(gulp);
    cb();
  }
};

function watchClient(gulp) {
  gulp
    .watch('src/**/*.js*', ['mocha'])
    .on('error', error => {
      console.error(error);
    });
}
