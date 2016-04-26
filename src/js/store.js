import logMiddleware from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import reducers from './reducers';
import sagas from './sagas';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

export const history = useRouterHistory(createHashHistory)({ queryKey: false });

const middlewares = [];

/* eslint-disable no-undef */
if (ENV.logDispatcher) {
  console.log('Set log middleware');
  middlewares.push(logMiddleware());
}
/* eslint-enable no-undef */

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

export const store = compose(
  applyMiddleware.apply(null, middlewares)
)(createStore)(reducer);

syncHistoryWithStore(history, store);
sagaMiddleware.run(sagas);

