'use strict';

/**
 * Copy the asset files in the dist folder
 */
module.exports = (gulp, config) => {
  const tasks = {
    'copy-assets': {
      fn: copyAssetsTask,
      description: 'Copy the asset files that does not need any processing in the dist folder'
    }
  };
  return tasks;

  function copyAssetsTask() {
    gulp.src(['assets/**'])
      .pipe(gulp.dest(`${config.folders.build}/assets`));
  }
};
