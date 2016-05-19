import logMiddleware from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}));

export const history = useRouterHistory(createHashHistory)({ queryKey: false });

const middlewares = [];

/* eslint-disable no-undef */
if (ENV.logDispatcher) {
  middlewares.push(logMiddleware());
}
/* eslint-enable no-undef */
middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));
export const store = compose(
  applyMiddleware.apply(null, middlewares)
)(createStore)(reducer);

sagaMiddleware.run(sagas);
syncHistoryWithStore(history, store);

