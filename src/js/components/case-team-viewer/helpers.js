import registry from 'app-registry';

export function fetchCaseTeam(caseTeam) {
  const config = registry.get('config');
  const store = registry.get('store');
  const userIds = caseTeam.map(person => person.memberId);

  // TODO: make tenant variable
  const result = userIds.map(userId => registry.get('request')
    .get(`${config.baseApiUrl}tenant/world/users/${userId}`, null, {
      headers: {
        [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
      }
    }));
  return result;
}
