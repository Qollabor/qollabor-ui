'use strict';

const path = require('path');

const baseApiUrl = 'http://localhost:18082/';

module.exports = {
  folders: {
    build: path.join(__dirname, '../dist')
  },
  server: {
    port: 8080
  },
  webpack: {
    logDispatcher: true
  },
  uglify: {
    beautify: true,
    global: false,
    sourcemap: true,
    mangle: false,
    compress: false
  },
  clientConfig: {
    login: {
      redirectUrl: {
        defaultSuccess: '/tasks',
        defaultCancel: '/'
      },
      token: {
        httpHeader: 'x-auth-cafienne',
        storage: {
          key: 'auth-cafienne'
        },
        expire: 1000 * 60 * 59// in milliseconds, 59 minutes
      },
      login: {
        url: `${baseApiUrl}identity/login`
      },
      refresh: {
        url: `${baseApiUrl}identity/refresh`
      }
    }
  }
};
