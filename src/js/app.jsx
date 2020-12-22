import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { replace as replaceRouter } from 'react-router-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { Router } from 'react-router';

import registry from 'app-registry';
import createAuth0Client from '@auth0/auth0-spa-js';


import { store, history } from './store';
import routes from './routes';

import request from './services/request';
import storage from './services/storage';
import logger from './services/logger';
import helpers from './helpers';

import theme from './themes';

registry.register('request', request);
registry.register('storage', storage);
registry.register('logger', logger);
registry.register('store', store);
registry.register('helpers', helpers);

registry.register('theme', theme);

/* eslint-disable no-undef */
if (typeof appConfig !== 'undefined') {
  const config = appConfig || {};
  registry.register('config', config);
  if (config.logger && config.logger.level) {
    logger.setLevel(config.logger.level);
  }
} else {
  registry.get('logger').warning('WARNING: the config is not defined');
}
/* eslint-enable no-undef */

// Check if is still required
injectTapEventPlugin();

store.dispatch({ type: 'APP:INIT' });

// TODO: When updated to react 16 or 17 use react context like described
// on: https://github.com/auth0-blog/react-auth0-spa-sdk-ga
(async () => {
  const auth0Client = await createAuth0Client({
    domain: 'qollabor-dev.eu.auth0.com',
    client_id: 'dB6D4G0TT11vJAzNatGksL3hDGo4ymC6',
    redirect_uri: 'http://localhost:8080'
  });

  window.addEventListener('load', async () => {
    if (window.location.search.includes('code=')) {
      await auth0Client.handleRedirectCallback();
      // get userprofile with this
      const user = await auth0Client.getUser();
      console.log(user);
      window.history.replaceState({}, document.title, window.location.pathname);

      // const accessToken = await auth0Client.getTokenSilently();
      const idTokenClaims = await auth0Client.getIdTokenClaims();
      // console.log(`accestoken${accessToken}`);
      const accessToken = idTokenClaims.__raw;
      // console.log('id_token');
      // console.log(test);

      if (accessToken !== undefined) {
        const config = registry.get('config');
        const userData = { username: user.name, token: `Bearer ${accessToken}` };
        registry.get('storage')
          .setItem(config.login.token.storage.key, 'Authorization');
        registry.get('storage')
          .setItem(config.login.user.storage.key, user.name);
        const config1 = registry.get('config');
        console.log('config1');
        console.log(config1);
        store.dispatch({ type: 'LOGIN:DO_LOGIN:SUCCESS', user: userData });
        setTimeout(() => { }, 5000);
        const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');
        console.log('redirect after login');
        console.log(redirectAfterLogin);
        if (redirectAfterLogin) {
          store.dispatch({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
          store.dispatch(replaceRouter(redirectAfterLogin));
        } else {
          store.dispatch(replaceRouter(registry.get('config').login.redirectUrl.defaultSuccess, {}));
        }
      } else {
        store.dispatch({ type: 'LOGIN:DO_LOGIN:FAIL', login: 'to do' });
      }
    }
  });

  store.dispatch({ type: 'APP:INIT_AUTH0_CLIENT', auth0Client });
})();


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
