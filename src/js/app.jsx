import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { Router } from 'react-router';

import registry from 'app-registry';

import { store, history } from './store';
import routes from './routes';

import request from './services/request';
import storage from './services/storage';
import logger from './services/logger';
import helpers from './helpers';
import auth0 from './helpers/auth0';

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

// Check if is still required
injectTapEventPlugin();

auth0();

store.dispatch({ type: 'APP:INIT' });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
