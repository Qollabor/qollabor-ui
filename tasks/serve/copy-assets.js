'use strict';

/**
 * Run the watch on the assets (html, css, images)
 */

module.exports = {
  fn: (gulp, config, cb) => {
    watchClient(gulp);
    cb();
  }
};

function watchClient(gulp) {
  gulp
    .watch('src/**/*.html', ['copy-html'])
    .on('error', error => {
      console.error(error);
    });

  gulp
    .watch(['src/**/*.css', 'src/**/*.scss'], ['css'])
    .on('error', error => {
      console.error(error);
    });
}
