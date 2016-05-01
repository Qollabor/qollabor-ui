'use strict';

/**
 * Build the complete application in the dist folder
 */
module.exports = () => {
  const tasks = {
    'pre-commit': {
      seq: [
        () => {
          process.env.NODE_ENV = 'test';
        },
        'eslint',
        'mocha'
      ]
    }
  };
  return tasks;
};
