// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { store, history } from './store';
import routes from './routes';

import registry from 'app-registry';
import request from './services/request';
import storage from './services/storage';

registry.register('request', request);
registry.register('storage', storage);
registry.register('config', {
  login: {
    returnURL: '/tasks'
  }
});

// Check if is still required
injectTapEventPlugin();

store.dispatch({ type: 'APP:INIT' });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
