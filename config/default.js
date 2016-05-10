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
  mockServer: {
    name: 'CafienneUi Mock',
    port: 8081
  },
  clientConfig: {
    login: {
      redirectUrl: {
        defaultSuccess: '/tasks',
        defaultCancel: '/'
      },
      token: {
        httpHeader: 'X-AUTH-CAFIENNE',
        storage: {
          key: 'auth-cafienne'
        },
        expire: 1000 * 60 * 59// in milliseconds, 59 minutes
      },
      user: {
        storage: {
          key: 'user-cafienne'
        }
      },
      login: {
        url: `${baseApiUrl}identity/login`
      },
      refresh: {
        url: `${baseApiUrl}identity/refresh`
      }
    },
    tasks: {
      url: `${baseApiUrl}tasks`,
      version: 1
    }
  }
};
