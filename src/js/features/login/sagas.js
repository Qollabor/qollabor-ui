import registry from 'app-registry';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { store } from '../../store';
import { replace as replaceRouter } from 'react-router-redux';
import { config } from './config';

function isPresent(value) {
  return value !== null && value !== undefined && value !== '';
}

function getFormErrors(username, password) {
  let usernameError;
  let passwordError;

  if (!isPresent(username)) {
    usernameError = 'Username may not be empty.';
  } else if (username.length > 16) {
    usernameError = 'Username may not be longer than 16 characters.';
  }

  if (!isPresent(password)) {
    passwordError = 'Password may not be empty.';
  }

  if (usernameError || passwordError) {
    return {
      username: usernameError,
      password: passwordError
    };
  }
  return null;
}

export function* loginFlow(action) {
  const errors = getFormErrors(action.username, action.password);
  if (errors) {
    yield put({
      type: 'LOGIN:DO_LOGIN:FAIL',
      username: errors.username,
      password: errors.password
    });
    return;
  }

  try {
    const response = yield registry.get('request')
      .post(config.api.login.url, {
        username: action.username, password: action.password
      });
    if (response.status === 204) {
      const userData = { username: action.username, token: response.headers.get(config.api.token.httpHeader) };
      registry.get('storage').setItem(config.api.token.storage.key, response.headers.get(config.api.token.httpHeader));
      yield put({ type: 'LOGIN:DO_LOGIN:SUCCESS', user: userData });

      const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');
      if (redirectAfterLogin) {
        yield put({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
        store.dispatch(replaceRouter(redirectAfterLogin));
      } else {
        store.dispatch(replaceRouter(registry.get('config').login.returnURL, {}));
      }
    } else {
      yield put({ type: 'LOGIN:DO_LOGIN:FAIL', username: response.body.content });
    }
  } catch (err) {
    yield put({ type: 'LOGIN:DO_LOGIN:FAIL', error: err });
  }
}

export function* refreshFlow(action) {
  try {
    const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');
    yield put({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
    const response = yield registry.get('request')
      .get(config.api.refresh.url, null, {
        headers: {
          [config.api.token.httpHeader]: action.authToken
        }
      });
    if (response.status === 204 || response.status === 200) {
      const userData = { token: response.headers.get(config.api.token.httpHeader) };
      registry.get('storage')
        .setItem(config.api.token.storage.key, response.headers.get(config.api.token.httpHeader));
      yield put({ type: 'LOGIN:VERIFY:SUCCESS', user: userData });
    } else {
      registry.get('storage')
        .removeItem(config.api.token.storage.key, response.headers.get(config.api.token.httpHeader));
      yield put({ type: 'LOGIN:VERIFY:FAIL', username: response.body.content });
    }
    if (redirectAfterLogin) {
      store.dispatch(replaceRouter(redirectAfterLogin));
    } else {
      store.dispatch(replaceRouter(registry.get('config').login.returnURL, {}));
    }
  } catch (err) {
    console.log(err);
    yield put({ type: 'LOGIN:VERIFY:FAIL', error: err });
  }
}

export const sagas =
  [
    function*() {
      yield takeEvery('LOGIN:DO_LOGIN', loginFlow);
    },
    function*() {
      yield takeEvery('LOGIN:VERIFY', refreshFlow);
    }
  ];

export default sagas;
