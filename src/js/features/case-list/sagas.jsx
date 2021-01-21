import registry from 'app-registry';
import { put } from 'redux-saga/effects';

const NO_OF_RESULTS = 15;

export function* resetAndFetch() {
  yield put({ type: 'CASE:LIST:REQUEST:INIT' });
  yield fetchCases();
}

export function* fetchCases() {
  const store = registry.get('store');
  const config = registry.get('config');
  const dataKey = '_2';

  yield put({ type: 'CASE:LIST:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(getURLWithParams(store, config), null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put({ type: 'APP:BREADCRUMB:SET', breadcrumbItem: { label: 'My Cases', url: '#/cases' } });
    yield put({ type: 'CASE:LIST:FETCH:SUCCESS', items: response.body });
  } catch (err) {
    yield put({ type: 'CASE:LIST:FETCH:FAIL', error: err.message });
  }
}

const getURLWithParams = (store, config) => {
  const { filterText, sortKey, sortDesc, position } = store.getState().caseList.toJS();
  let url = `${config.baseApiUrl}cases/user?numberOfResults=${NO_OF_RESULTS}`;
  url = filterText ? `${url}&filterText=${filterText}` : url;
  url = sortKey ? `${url}&sortBy=${sortKey}` : url;
  url = sortKey ? `${url}&sortOrder=${sortDesc ? 'DESC' : 'ASC'}` : url;
  url = `${url}&offset=${position}`;
  return url;
};
