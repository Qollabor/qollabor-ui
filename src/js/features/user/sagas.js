import registry from 'app-registry';
import { takeEvery } from 'redux-saga';
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
  refreshTokenTimeout = setTimeout(refreshTokenCallback, config.login.token.expire);
}

export function* unsetLoggedUserFlow(action) {
  console.log(action);
  yield put({ type: 'USER:SET_LOGGED_USER', user: null });
}

export const sagas =
  [
    function*() {
      yield takeEvery('USER:DO_LOGOUT', logoutFlow);
    },
    function*() {
      yield takeEvery(['LOGIN:VERIFY:SUCCESS', 'LOGIN:DO_LOGIN:SUCCESS'], setLoggedUserFlow);
    },
    function*() {
      yield takeEvery(['LOGIN:VERIFY:FAIL', 'LOGIN:DO_LOGIN:FAIL'], unsetLoggedUserFlow);
    }
  ];

export default sagas;
