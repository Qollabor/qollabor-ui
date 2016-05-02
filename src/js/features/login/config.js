export const config = {};

config.api = {
  token: {
    httpHeader: 'x-auth-cafienne',
    storage: {
      key: 'auth-cafienne'
    },
    expire: 1000 * 60 * 59// in milliseconds, 59 minutes
  },
  login: {
    url: 'http://localhost:18082/identity/login'
  },
  refresh: {
    url: 'http://localhost:18082/identity/refresh'
  }
};
