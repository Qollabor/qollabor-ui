'use strict';

/**
 * Run the watch on the assets (html, css, images)
 */
module.exports = (gulp) => {
  return {
    watchAssets: {
      fn: watchClient
    }
  };

  function watchClient() {
    gulp
      .watch('src/**/*.html', ['copy-html'])
      .on('error', error => {
        /* eslint-disable no-console */
        console.error(error);
      });

    gulp
      .watch(['src/**/*.css', 'src/**/*.scss'], ['css'])
      .on('error', error => {
        /* eslint-disable no-console */
        console.error(error);
      });

    gulp
      .watch(['assets/**'], ['copy-assets'])
      .on('error', error => {
        /* eslint-disable no-console */
        console.error(error);
      });
  }
};
