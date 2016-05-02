'use strict';

/**
 * Run the tests after a source file is changed
 */
module.exports = (gulp) => {
  return {
    watchTest: {
      fn: watchClient
    }
  };

  function watchClient() {
    gulp
      .watch('src/**/*.js*', ['mocha'])
      .on('error', error => {
        console.error(error);
      });
  }
};
