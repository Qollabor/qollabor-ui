

const path = require('path');

const baseApiUrl = process.env.QOLLABOR_API_URL
  ? process.env.QOLLABOR_API_URL
  : '/api/';

const apiProxyUrl = process.env.QOLLABOR_PROXY_URL
  ? process.env.QOLLABOR_PROXY_URL
  : 'http://localhost:18082/'

console.log('Set baseApiUrl to', baseApiUrl);
console.log('Set reverse proxy for API to', apiProxyUrl);

module.exports = {
  folders: {
    build: path.join(__dirname, '../dist')
  },
  server: {
    port: 8080,
    proxy: apiProxyUrl
  },
  webpack: {
    logDispatcher: true,
    reduxDevTools: true
  },
  uglify: {
    beautify: true,
    global: false,
    sourcemap: true,
    mangle: false,
    compress: false
  },
  mockServer: {
    name: 'QollaborUi Mock',
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
        httpHeader: 'X-AUTH-QOLLABOR',
        storage: {
          key: 'auth-qollabor'
        },
        expire: 1000 * 60 * 59 // in milliseconds, 59 minutes
      },
      user: {
        storage: {
          key: 'user-qollabor'
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
