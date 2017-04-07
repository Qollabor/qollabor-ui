
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

if (ENV.logDispatcher) { // eslint-disable-line no-undef
  middlewares.push(logMiddleware());
}

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

let composeEnhancers = compose;

if (ENV.reduxDevTools) { // eslint-disable-line no-undef
  composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || composeEnhancers;
}

export const store = composeEnhancers(
  applyMiddleware.apply(null, middlewares)
)(createStore)(reducer);

sagaMiddleware.run(sagas);
syncHistoryWithStore(history, store);
