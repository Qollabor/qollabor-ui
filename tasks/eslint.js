'use strict';

/**
 * Check the JS syntax using eslint
 */
module.exports = (gulp) => {
  const tasks = {
    eslint: {
      fn: eslintTask,
      description: 'Check the JS syntax using eslint'
    }
  };

  return tasks;

  function eslintTask() {
    const eslint = require('gulp-eslint');
    return gulp.src(['src/**/*.js', 'src/**/*.jsx', 'tasks/**/*.js', 'tests/**/*.js', 'server/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  }
};
