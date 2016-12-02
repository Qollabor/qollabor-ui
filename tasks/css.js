/**
 * Bundle and copy the css/scss files in the dist folder
 */
module.exports = (gulp, config) => {
  const tasks = {
    css: {
      fn: cssTask,
      description: 'Bundle and copy the css/scss files in the dist folder'
    }
  };
  return tasks;

  function cssTask() {
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
};
