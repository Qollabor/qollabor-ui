import registry from 'app-registry';
import { put } from 'redux-saga/effects';

const NO_OF_RESULTS = 15;

export function* resetAndSearch() {
  const getQueryStrings = registry.get('helpers').getQueryStrings;
  const queryParams = getQueryStrings();
  yield put({ type: 'SEARCH:LIST:REQUEST:INIT', searchText: queryParams.searchText });
  yield search();
}

export function* search() {
  const store = registry.get('store');
  const config = registry.get('config');
  const dataKey = '_2';

  yield put({ type: 'SEARCH:LIST:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(getURLWithParams(store, config), null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put({ type: 'SEARCH:LIST:FETCH:SUCCESS', items: response.body[dataKey] });
  } catch (err) {
    yield put({ type: 'SEARCH:FETCH:FAIL', error: err.message });
  }
}

const getURLWithParams = (store, config) => {
  const { sortKey, sortDesc, position, searchText } = store.getState().searchResult.toJS();
  let url = `${config.baseApiUrl}search?numberOfResults=${NO_OF_RESULTS}`;
  url = searchText ? `${url}&query=${searchText}` : url;
  url = sortKey ? `${url}&sortBy=${sortKey}` : url;
  url = sortKey ? `${url}&sortOrder=${sortDesc ? 'DESC' : 'ASC'}` : url;
  url = `${url}&offset=${position}`;
  return url;
};
