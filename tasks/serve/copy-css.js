'use strict';

/**
 * Bundle and copy the css/scss files in the dist folder
 */
module.exports = {
  fn: (gulp, config, cb) => {
    cssTask(gulp, config);
    cb();
  }
};

function cssTask(gulp, config) {
  const sass = require('gulp-sass');
  const cssGlobbing = require('gulp-css-globbing');

  return gulp.src(['src/styles.scss'])
    .pipe(cssGlobbing({
      extensions: ['.css', '.scss'],
      ignoreFolders: ['../styles'],
      autoReplaceBlock: {
        onOff: true,
        globBlockBegin: 'cssGlobbingBegin',
        globBlockEnd: 'cssGlobbingEnd',
        globBlockContents: '../**/*.scss'
      },
      scssImportPath: {
        leading_underscore: false,
        filename_extension: false
      }
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.folders.build));
}
