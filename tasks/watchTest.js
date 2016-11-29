/**
 * Run the tests after a source file is changed
 */
module.exports = (gulp) => {
  return {
    watchTest: {
      fn: watchClient
    }
  };

  function watchClient () {
    gulp
      .watch(['src/**/*.js', 'src/**/*.jsx'], ['mocha'])
      .on('error', error => {
        /* eslint-disable no-console */
        console.error(error);
      });
  }
};
