import registry from 'app-registry';
import { put } from 'redux-saga/effects';
import { store } from '../../store';
import { replace as replaceRouter } from 'react-router-redux';

let refreshTokenTimeout;
function refreshTokenCallback() {
  const config = registry.get('config');
  store.dispatch({ type: 'USER:TOKEN_REFRESH' });
  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
  }
  refreshTokenTimeout = setTimeout(refreshTokenCallback, config.login.token.expire);
}

export function* logoutFlow() {
  const config = registry.get('config');
  registry.get('storage').removeItem(config.login.token.storage.key);
  registry.get('storage').removeItem(config.login.user.storage.key);
  yield put({ type: 'USER:SET_LOGGED_USER', user: null });
  store.dispatch(replaceRouter('/', {}));
  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
  }
}

export function* setLoggedUserFlow(action) {
  const config = registry.get('config');
  yield put({ type: 'USER:SET_LOGGED_USER', user: action.user });
  if (refreshTokenTimeout) {
    clearTimeout(refreshTokenTimeout);
  }
  if (action.user) {
    refreshTokenTimeout = setTimeout(refreshTokenCallback, config.login.token.expire);
  }
}

export function* unsetLoggedUserFlow() {
  yield put({ type: 'USER:SET_LOGGED_USER', user: null });
}

let current = 0;
export function* tokenNotValidFlow() {
  const newLocation = store.getState().routing.locationBeforeTransitions;
  newLocation.query.forceRefresh = current++;
  yield put({ type: 'LOGIN:LOGIN_REDIRECT_SET', redirect: store.getState().routing.locationBeforeTransitions });

  yield put(replaceRouter({
    pathname: '/login'
  }));
}
