'use strict';

const path = require('path');

module.exports = {
  webpack: {
    logDispatcher: false
  },
  uglify: {
    global: true,
    sourcemap: false,
    mangle: true,
    compress: true
  }
};
