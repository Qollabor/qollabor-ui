'use strict';

const path = require('path');

const baseApiUrl = process.env.CAFIENNE_API_URL
  ? process.env.CAFIENNE_API_URL
  : 'http://localhost:18082/';

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
    logger: {
      level: 6 // LEVEL_INFO
    },
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
        expire: 1000 * 60 * 59 // in milliseconds, 59 minutes
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
    },
    cases: {
      url: `${baseApiUrl}cases`,
      version: 1,
      lastModifiedHttpHeader: 'Case-Last-Modified'
    },
    case: {
      caseTeam: {
        maxPeopleInList: 4
      }
    },
    casemodels: {
      url: `${baseApiUrl}repository/list`,
      version: 1
    },
    casemodeldetail: {
      url: `${baseApiUrl}repository/load`,
      version: 1
    },
    baseApiUrl
  }
};
