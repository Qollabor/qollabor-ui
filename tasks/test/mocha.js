'use strict';

/**
 * Run the unit test
 */
module.exports = {
  fn: (gulp, config, cb) => {
    mochaTask(gulp, cb);
  }
};

function mochaTask(gulp, done) {
  const mocha = require('gulp-mocha-co');
  const babel = require('babel-register');

  return gulp.src([
    './src/js/**/test/*.spec.js*',
    './tests/**/*.spec.js'
  ], { read: false })
    .pipe(
      mocha({
        reporter: 'spec',
        compilers: {
          js: babel
        }
      })
    )
    // .on('end', done)
    .on('error', err => {
      console.log(err);
      done(err);
    });
}
