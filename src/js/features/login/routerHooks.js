import registry from 'app-registry';
import { config } from './config';

export function onEnterRouterHook(nextState, replace, store, requireAuth) {
  const loggedInUser = store.getState().user.get('loggedUser');
  const isAuthenticated = loggedInUser !== null;
  const authToken = registry.get('storage').getItem(config.api.token.storage.key);
  if (authToken && !isAuthenticated) {
    store.dispatch({ type: 'LOGIN:LOGIN_REDIRECT_SET', redirect: nextState.location });
    store.dispatch({ type: 'LOGIN:VERIFY', authToken });
    return false;
  }
  if (requireAuth && !isAuthenticated) {
    store.dispatch({ type: 'LOGIN:LOGIN_REDIRECT_SET', redirect: nextState.location });
    replace({
      pathname: '/login'
    });
    return false;
  }
  return true;
}

export function onChangeRouterHook(prevState, nextState, replace, store, requireAuth) {
  const loggedInUser = store.getState().user.get('loggedUser');
  const isAuthenticated = loggedInUser !== null;
  if (requireAuth && !isAuthenticated) {
    store.dispatch({ type: 'LOGIN:LOGIN_REDIRECT_SET', redirect: nextState.location });
    replace({
      pathname: '/login'
    });
    return false;
  }
  return true;
}
