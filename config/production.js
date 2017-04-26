module.exports = {
  webpack: {},
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
