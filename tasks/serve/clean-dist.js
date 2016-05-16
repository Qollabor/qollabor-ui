'use strict';

/**
 * Clean the dist folder
 */

module.exports = {
  fn: (gulp, config, cb) => {
    cleanTask();
    cb();
  }
};

function cleanTask() {
  const del = require('del');
  del.sync(['dist/*']);
}
