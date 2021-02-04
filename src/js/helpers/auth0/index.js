import 'babel-polyfill';
import { replace as replaceRouter } from 'react-router-redux';
import registry from 'app-registry';
import createAuth0Client from '@auth0/auth0-spa-js';
import { store } from './../../store';

const authOptions = {
  domain: 'qollabor-dev.eu.auth0.com',
  client_id: 'dB6D4G0TT11vJAzNatGksL3hDGo4ymC6',
  redirect_uri: 'http://localhost:8080'
};

const redirect = () => {
  const redirectAfterLogin = store.getState().login.get('redirectAfterLogin');

  if (redirectAfterLogin) {
    store.dispatch({ type: 'LOGIN:LOGIN_REDIRECT_USE' });
    store.dispatch(replaceRouter(redirectAfterLogin));
  } else {
    store.dispatch(replaceRouter(registry.get('config').login.redirectUrl.defaultSuccess, {}));
  }
};

export default async () => {
  const auth0Client = await createAuth0Client(authOptions);
  store.dispatch({ type: 'APP:INIT_AUTH0_CLIENT', auth0Client });

  window.addEventListener('load', async () => {
    if (window.location.search.includes('code=')) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, window.location.pathname);

      const idTokenClaims = await auth0Client.getIdTokenClaims();
      const user = await auth0Client.getUser();

      /* eslint-disable no-underscore-dangle */
      const accessToken = idTokenClaims.__raw;
      const exp = idTokenClaims.exp;
      if (accessToken !== undefined) {
        // Add to local storage
        registry.get('storage').setItem('token', accessToken);
        registry.get('storage').setItem('expDate', exp);
        registry.get('storage').setItem('sub', user.sub);

        // Add to store
        const userData = { username: user.sub, token: `Bearer ${accessToken}` };
        store.dispatch({ type: 'LOGIN:DO_LOGIN:SUCCESS', user: userData });

        redirect();
      }
    }
  });
};

export const login = async() => {
  const auth0Client = store.getState().app.get('auth0Client');
  await auth0Client.loginWithRedirect();
};

export const logout = async() => {
  const auth0Client = store.getState().app.get('auth0Client');
  await auth0Client.logout();
  registry.get('storage').removeItem('token');
  registry.get('storage').removeItem('expDate');
  registry.get('storage').removeItem('sub');
};
