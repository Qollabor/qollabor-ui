import registry from 'app-registry';
import { put } from 'redux-saga/effects';

const NO_OF_RESULTS = 10;


export function* resetAndfetchUsersList() {
  yield put({ type: 'USERS_SELECTOR:LIST:REQUEST:INIT' });
  yield fetchUsersList();
}


export function* fetchUsersList() {
  const store = registry.get('store');
  const config = registry.get('config');
  const dataKey = '_2';

  yield put({ type: 'USERS_SELECTOR:LIST:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(getURLWithParams(store, config), null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });
    yield put({ type: 'USERS_SELECTOR:LIST:FETCH:SUCCESS', items: response.body[dataKey] });
  } catch (err) {
    yield put({ type: 'USERS_SELECTOR:FETCH:FAIL', error: err.message });
  }
}

const getURLWithParams = (store, config) => {
  const filterString = store.getState().userSelector.get('filterString');
  const sortKey = 'name';
  const sortDesc = 'ASC';
  let url = `${config.baseApiUrl}users?numberOfResults=${NO_OF_RESULTS}`;
  url = filterString ? `${url}&filterString=${filterString}` : url;
  url = sortKey ? `${url}&sortBy=${sortKey}` : url;
  url = sortKey ? `${url}&sortOrder=${sortDesc ? 'DESC' : 'ASC'}` : url;
  return url;
};

const sagas = [

];

export default sagas;

