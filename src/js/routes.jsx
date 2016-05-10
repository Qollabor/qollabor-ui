import React from 'react';
import { Route } from 'react-router';
import { store } from './store';
import { onEnterRouterHook as loginOnEnterHook, onChangeRouterHook as loginOnChangeHook } from './features/login';
import MainLayout from './layouts/mainLayout';
import NoHeaderLayout from './layouts/noHeaderLayout.jsx';
import InfoPage from './pages/info';
import TasksPage from './pages/tasks';
import LoginPage from './pages/login';

function getValuesFromRoutes(routes, attribute) {
  for (let i = routes.length - 1; i >= 0; i--) {
    if (routes[i][attribute] !== undefined) {
      return routes[i][attribute];
    }
  }
  return null;
}

function enterRouteHook(nextState, replace) {
  loginOnEnterHook(nextState, replace, store, getValuesFromRoutes(nextState.routes, 'requireAuth'));
}

function changeRouteHook(prevState, nextState, replace) {
  loginOnChangeHook(prevState, nextState, replace, store, getValuesFromRoutes(nextState.routes, 'requireAuth'));
}

const hooks = {
  onEnter: enterRouteHook,
  onChange: changeRouteHook
};

export default (
  <Route>
    <Route component={NoHeaderLayout}>
      <Route path="/login" component={LoginPage} {...hooks} />
    </Route>

    <Route component={MainLayout}>
      <Route requireAuth={true}>
        <Route path="/" component={TasksPage} {...hooks} />
        <Route path="/info" component={InfoPage} {...hooks} />
        <Route path="/tasks" component={TasksPage} {...hooks} />
      </Route>
    </Route>
  </Route>
);
