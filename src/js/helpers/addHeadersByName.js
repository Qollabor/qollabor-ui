import registry from 'app-registry';

export const addAuthHeader = () => {
  const config = registry.get('config');
  const store = registry.get('store');

  const authQollabor = {
    [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
  };

  return authQollabor;
};

export const addCaseLastModifiedHeader = (lastModifiedTime) => {
  if (!lastModifiedTime) {
    return {};
  }

  const config = registry.get('config');

  const caseLastModified = {
    [config.cases.lastModifiedHttpHeader]: lastModifiedTime
  };

  return caseLastModified;
};

export const addHeadersByName = (names, args) => names.map((name) => {
  switch (name) {
    case 'qollaborAuth':
      return addAuthHeader();

    case 'caseLastModified':
      return addCaseLastModifiedHeader(args ? args.caseLastModified : undefined);

    default:
      throw new Error(`Header not recognized ${name}`);
  }
}).reduce((accumulator, value) => {
  const ret = {
    headers: Object.assign(accumulator.headers, value)
  };

  return ret;
}, { headers: {} });
