

module.exports = {
  webpack: {
    logDispatcher: false,
    reduxDevTools: false
  },
  uglify: {
    global: true,
    sourcemap: false,
    mangle: true,
    compress: true
  },
  clientConfig: {
    logger: {
      level: 3 // LEVEL_ERROR
    }
  }
};
