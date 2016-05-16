'use strict';

/**
 * Copy the html files in the dist folder
 */
module.exports = {
  fn: (gulp, config, cb) => {
    copyHtmlTask(gulp, config);
    cb();
  }
};

function copyHtmlTask(gulp, config) {
  gulp.src('src/*.html')
    .pipe(gulp.dest(config.folders.build));
}
