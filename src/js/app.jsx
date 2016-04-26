// import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { store, history } from './store';
import routes from './routes';

import registry from './services/registry';
import request from './services/request';

registry.register('request', request);

// request
//   .post('http://localhost:18082/identity/login', { username: 'admin', password: 'admin' })
//   .then(response => {
//     console.log(response);
//   });

// Needed before react 1.0 release
// Check if is still required
injectTapEventPlugin();

// ReactDOM.render(
//   <div>test</div>
//   , document.getElementById('app')
// );
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);

store.dispatch({ type: 'APP:INIT' });
