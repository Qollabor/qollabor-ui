'use strict';

/**
 * Build the complete application in the dist folder
 */
module.exports = () => {
  const tasks = {
    build: {
      seq: [
        'clean',
        'css',
        'build-src',
        'copy-html',
        'copy-assets'
      ]
    }
  };
  return tasks;
};
