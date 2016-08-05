import registry from 'app-registry';

export function fetchCaseTeam(caseTeam) {
  const config = registry.get('config');
  const store = registry.get('store');
  const userIds = caseTeam.map((person) => person.user).join(',');
  return registry.get('request')
    .get(`${config.baseApiUrl}users?ids=${userIds}`, null, {
      headers: {
        [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
      }
    });
}
