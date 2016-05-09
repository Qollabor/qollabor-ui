import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

export function* fetchTasks() {
  const store = registry.get('store');
  const dataKey = '_2';
  const config = registry.get('config');

  yield put({ type: 'TASKS:LIST:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(config.tasks.url, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put({ type: 'TASKS:LIST:FETCH:SUCCESS', tasks: response.body[dataKey] });
  } catch (err) {
    console.log(err);
    yield put({ type: 'TASKS:LIST:FETCH:FAIL', error: err.message });
  }
}

export const sagas = [
  function*() {
    yield takeEvery('TASKS:LIST:REQUEST_INIT', fetchTasks);
  }
];

export default sagas;
