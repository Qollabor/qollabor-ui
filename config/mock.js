'use strict';

const baseApiUrl = 'http://localhost:8081/';

module.exports = {
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
    },
    tasks: {
      url: `${baseApiUrl}tasks`,
      version: 2
    },
    cases: {
      url: `${baseApiUrl}cases`,
      version: 2
    }
  }
};
