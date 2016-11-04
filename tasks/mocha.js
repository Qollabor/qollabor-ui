'use strict';

const path = require('path');
const ignoreStyles = require('ignore-styles');
/**
 * Run the unit test
 */
module.exports = (gulp) => {
  const tasks = {
    mocha: {
      fn: mochaTask,
      description: 'Run the unit test'
    }
  };
  return tasks;

  function mochaTask(done) {
    const mocha = require('gulp-mocha-co');
    const babel = require('babel-register')({
      ignore: (filename) => {
        const elementFolder = 'cafienne-ui-elements';
        const startPath = path.join(__dirname, '..', 'node_modules');
        if (filename.substr(0, startPath.length) === startPath) {
          if (filename.substr(startPath.length + 1, elementFolder.length) === elementFolder) {
            return false;
          }
          return true;
        }
        return false;
      }
    });

    return gulp.src(['./tests/helpers/plugins.js',
      './src/js/**/test/*.spec.js*',
      './tests/**/*.spec.js'
    ], { read: false })
      .pipe(
        mocha({
          reporter: 'spec',
          compilers: {
            js: babel,
            css: ignoreStyles
          }
        })
      )
      // .on('end', done)
      .on('error', err => {
        /* eslint-disable no-console */
        console.log(err);
        done(err);
      });
  }
};
