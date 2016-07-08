import registry from 'app-registry';
import { store } from '../../store';

export function fetchAvatar(userId) {
  const config = registry.get('config');

  return registry.get('request')
      .get(`${config.baseApiUrl}users/${userId}/avatar/1`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });
}

