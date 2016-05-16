'use strict';

/**
 * Check the JS syntax using eslint
 */
module.exports = {
  fn: (gulp, config, cb) => {
    eslintTask(gulp);
    cb();
  }
};

function eslintTask(gulp) {
  const eslint = require('gulp-eslint');
  return gulp.src(['src/**/*.js', 'src/**/*.jsx', 'tasks/**/*.js', 'tests/**/*.js', 'server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}
