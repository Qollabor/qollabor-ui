'use strict';

/**
 * Clean the dist folder
 */
module.exports = () => {
  const tasks = {
    clean: {
      fn: cleanTask,
      description: 'Clean the dist folder'
    }
  };
  return tasks;

  function cleanTask() {
    const del = require('del');
    del.sync(['dist/*']);
  }
};
