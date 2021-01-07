import registry from 'app-registry';
import moment from 'moment';

export function onEnterRouterHook(nextState, replace, store, requireAuth) {
  const storedToken = registry.get('storage').getItem('token');
  const storedExp = registry.get('storage').getItem('expDate');
  const storedName = registry.get('storage').getItem('name');
  const tokenValid = storedExp ? moment.unix(parseInt(storedExp, 10)) > moment() : false;

  if (storedToken && storedName && tokenValid) {
    const userData = { username: storedName, token: `Bearer ${storedToken}` };
    store.dispatch({ type: 'LOGIN:DO_LOGIN:SUCCESS', user: userData });
  } else {
    registry.get('storage').removeItem('token');
    registry.get('storage').removeItem('expDate');
    registry.get('storage').removeItem('name');
  }

  const loggedInUser = store.getState().user.get('loggedUser');
  const isAuthenticated = loggedInUser !== null;

  const authToken = registry.get('storage').getItem('token');
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
