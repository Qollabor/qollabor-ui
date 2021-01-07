import registry from 'app-registry';
import { put } from 'redux-saga/effects';
import { replace as replaceRouter } from 'react-router-redux';
import { initialize } from 'redux-form';
import { store } from '../../store';
import { notifySuccess, notifyDanger } from '../notifier';
import { logout } from './../../helpers/auth0';

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
  // logout from auth0
  logout();

  // old flow
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

export function* tokenNotValidFlow() {
  yield put({ type: 'LOGIN:VERIFY:FAIL' });
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

export function* updateAvatar(action) {
  const config = registry.get('config');
  const dataKey = '_2';
  const avatarData = {
    avatar: action.avatar
  };
  try {
    const response = yield registry.get('request')
      .post(`${config.baseApiUrl}user/avatar`, avatarData, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    switch (response.status) {
      case 204: {
        yield put(notifySuccess('Image successfully changed'));
        yield put({ type: 'USER:AVATAR:UPDATE:SUCCESS', data: response.body[dataKey] });
        yield put({ type: 'USER:PROFILE:INIT' });
        break;
      }
      default:
        yield put(notifyDanger(response.body));
        yield put({ type: 'USER:AVATAR:UPDATE:FAIL', error: response.body });
        break;
    }
  } catch (err) {
    yield put({ type: 'USER:AVATAR:UPDATE:FAIL', error: err.message });
  }
}

export function* fetchProfile() {
  const config = registry.get('config');
  console.log('in de fetch profile');

  yield put({ type: 'USER:PROFILE:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(`${config.baseApiUrl}user`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put(initialize('UserProfile', response.body));
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
