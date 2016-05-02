import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { store } from '../../store';

function* fetchTasks() {
  const dataKey = '_2';
  const config = registry.get('config');

  yield put({ type: 'TASK_LIST:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(config.tasks.url, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    yield put({ type: 'TASK_LIST:FETCH:SUCCESS', tasks: response.body[dataKey] });
  } catch (err) {
    console.log(err);
    yield put({ type: 'TASK_LIST:FETCH:FAIL', error: err.message });
  }
}

export const sagas = [
  function*() {
    yield takeEvery('TASK_LIST:REQUEST_INIT', fetchTasks);
  }
];

export default sagas;
