import registry from 'app-registry';
import { put } from 'redux-saga/effects';
import { store } from '../../store';
import { replace as replaceRouter } from 'react-router-redux';

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
  const config = registry.get('config');
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
      .post(config.login.login.url, {
        username: action.username, password: action.password
      });
    if (response.status === 204) {
      const userData = { username: action.username, token: response.headers.get(config.login.token.httpHeader) };
      registry.get('storage')
        .setItem(config.login.token.storage.key, response.headers.get(config.login.token.httpHeader));
      registry.get('storage')
        .setItem(config.login.user.storage.key, action.username);
      yield put({ type: 'LOGIN:DO_LOGIN:SUCCESS', user: userData });

      const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');
      if (redirectAfterLogin) {
        yield put({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
        store.dispatch(replaceRouter(redirectAfterLogin));
      } else {
        store.dispatch(replaceRouter(registry.get('config').login.redirectUrl.defaultSuccess, {}));
      }
    } else {
      yield put({ type: 'LOGIN:DO_LOGIN:FAIL', login: response.body.content });
    }
  } catch (err) {
    registry.get('logger').error(err);
    const errorMsg = (err.response && err.response.body) ? err.response.body
      : 'Authentication failure: A network error has occurred.';
    yield put({ type: 'LOGIN:DO_LOGIN:FAIL', login: errorMsg });
  }
}

export function* refreshFlow(action) {
  const config = registry.get('config');
  try {
    const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');
    yield put({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
    const response = yield registry.get('request')
      .get(config.login.refresh.url, null, {
        headers: {
          [config.login.token.httpHeader]: action.authToken
        }
      });
    if (response.status === 204 || response.status === 200) {
      const userData = {
        token: response.headers.get(config.login.token.httpHeader),
        username: registry.get('storage').getItem(config.login.user.storage.key)
      };
      registry.get('storage')
        .setItem(config.login.token.storage.key, response.headers.get(config.login.token.httpHeader));
      yield put({ type: 'LOGIN:VERIFY:SUCCESS', user: userData });
    } else {
      registry.get('storage').removeItem(config.login.token.storage.key);
      registry.get('storage').removeItem(config.login.user.storage.key);
      yield put({ type: 'LOGIN:VERIFY:FAIL', username: response.body.content });
    }
    if (redirectAfterLogin) {
      store.dispatch(replaceRouter(redirectAfterLogin));
    } else {
      store.dispatch(replaceRouter(registry.get('config').login.redirectUrl.defaultSuccess, {}));
    }
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'LOGIN:VERIFY:FAIL', error: err });
  }
}

export function* tokenRefreshFlow(action) {
  const config = registry.get('config');
  try {
    const response = yield registry.get('request')
      .get(config.login.refresh.url, null, {
        headers: {
          [config.login.token.httpHeader]: action.authToken
        }
      });
    if (!(response.status === 204 || response.status === 200)) {
      registry.get('storage').removeItem(config.login.token.storage.key);
      registry.get('storage').removeItem(config.login.user.storage.key);
      yield put({ type: 'LOGIN:TOKEN_REFRESH:FAIL' });
    }
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'LOGIN:TOKEN_REFRESH:FAIL', error: err });
  }
}
