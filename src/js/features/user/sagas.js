import registry from 'app-registry';
import { put } from 'redux-saga/effects';
import { store } from '../../store';
import { replace as replaceRouter } from 'react-router-redux';
import { notifySuccess, notifyDanger } from '../notifier';
import { initialize } from 'redux-form';

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

export function* changePassword(action) {
  const config = registry.get('config');
  const dataKey = '_2';
  const userData = {
    oldPassword: action.oldPassword,
    newPassword: action.newPassword
  };
  try {
    const response = yield registry.get('request')
      .put(`${config.baseApiUrl}user/changepassword`, userData, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    switch (response.status) {
      case 204: {
        yield put(notifySuccess('Password successfully changed'));
        yield put({ type: 'USER:CHANGE_PASSWORD:SUCCESS', data: response.body[dataKey] });
        break;
      }
      default:
        yield put(notifyDanger(response.body));
        yield put({ type: 'USER:CHANGE_PASSWORD:FAIL', error: response.body });
        break;
    }
  } catch (err) {
    yield put({ type: 'USER:CHANGE_PASSWORD:FAIL', error: err.message });
  }
}


export function* fetchProfile() {
  const config = registry.get('config');

  yield put({ type: 'USER:PROFILE:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(`${config.baseApiUrl}user`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put({ type: 'USER:PROFILE:FETCH:SUCCESS', data: response.body });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'USER:PROFILE:FETCH:FAIL', error: err.message });
  }
}

export function* updateProfile() {
  const config = registry.get('config');
  const options = {};
  let { data } = store.getState().user.toJS();
  const request = registry.get('request');
  options.headers = { [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token']) };

  try {
    const response = yield request.put(`${config.baseApiUrl}user`, data, options);
    data = { uniqueId: data.uniqueId, name: data.name, roles: data.roles };

    yield response;

    switch (response.status) {
      case 201:
      case 204: yield put(notifySuccess('User profile updated successfully'));
        yield put({ type: 'USER:PROFILE:UPDATE:SUCCESS', data });
        yield put(initialize('UserProfile', data));
        break;
      default: yield put(notifyDanger(response.body));
        break;
    }
  } catch (err) {
    yield put({ type: 'USER:PROFILE:UPDATE:FAIL', error: err.message });
  }
}
