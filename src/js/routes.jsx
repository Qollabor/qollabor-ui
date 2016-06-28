import React from 'react';
import { Route } from 'react-router';
import { store } from './store';
import { onEnterRouterHook as loginOnEnterHook, onChangeRouterHook as loginOnChangeHook } from './features/login';
import MainLayout from './layouts/mainLayout';
import NoHeaderLayout from './layouts/noHeaderLayout.jsx';
import InfoPage from './pages/info';
import TasksPage from './pages/tasks';
import TaskPage from './pages/task';
import LoginPage from './pages/login';
import CaseModelsPage from './pages/caseModels';
import CaseModelDetailPage from './pages/caseModelDetail';

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
  const showCaseUsers = getValuesFromRoutes(nextState.routes, 'showCaseUsers') || false;
  store.dispatch({ type: 'APP:CASE_USERS:SHOW', showCaseUsers });

  const headerMenu = getValuesFromRoutes(nextState.routes, 'headerMenu') || [];
  store.dispatch({ type: 'APP:HEADER_MENU:SET', headerMenu });
}

function changeRouteHook(prevState, nextState, replace) {
  loginOnChangeHook(prevState, nextState, replace, store, getValuesFromRoutes(nextState.routes, 'requireAuth'));
  const showCaseUsers = getValuesFromRoutes(nextState.routes, 'showCaseUsers') || false;
  store.dispatch({ type: 'APP:CASE_USERS:SHOW', showCaseUsers });
}

const hooks = {
  onEnter: enterRouteHook,
  onChange: changeRouteHook
};

const headerMenuTask = [
  { name: 'Start Case', url: '/casemodels' }
];

const headerMenuCasemodels = [
  { name: 'Tasks', url: '/' }
];

export default (
  <Route>
    <Route component={NoHeaderLayout}>
      <Route path="/login" component={LoginPage} {...hooks} />
    </Route>

    <Route component={MainLayout}>
      <Route requireAuth={true}>
        <Route path="/" component={TasksPage} {...hooks} headerMenu={headerMenuTask}/>
        <Route path="/info" component={InfoPage} {...hooks} />
        <Route path="/tasks" component={TasksPage} {...hooks} headerMenu={headerMenuTask}/>
        <Route path="/tasks/:taskId" component={TaskPage} {...hooks} showCaseUsers={true} headerMenu={headerMenuTask}/>
        <Route path="/casemodels" component={CaseModelsPage} {...hooks} headerMenu={headerMenuCasemodels}/>
        <Route path="/casemodels/:id" component={CaseModelDetailPage} {...hooks} headerMenu={headerMenuCasemodels}/>
      </Route>
    </Route>
  </Route>
);
