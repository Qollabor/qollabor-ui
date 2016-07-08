import 'whatwg-fetch';

import registry from 'app-registry';
import { store } from '../../store';

const defaultGetHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};


export function fetchAvatar(userId) {
  const config = registry.get('config');
  const url = `${config.baseApiUrl}users/${userId}/avatar/1`;
  let headers = Object.assign({}, defaultGetHeaders);
  const optionHeaders = {
    [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
  };
  headers = Object.assign(headers, optionHeaders);

  return fetch(
    url,
    {
      method: 'GET',
      headers
    }
  );
}

