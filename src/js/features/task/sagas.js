import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

function* fetchTaskDetails(action) {
  const store = registry.get('store');
  const dataKey = '_2';
  const config = registry.get('config');

  yield put({ type: 'TASK:FETCH' });

  try {
    const response = yield registry.get('request')
      .get(`${config.tasks.url}/${action.taskId}`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    let taskDetails = [];

    if (config.tasks.version === 1) {
      if (response.body[dataKey]) {
        taskDetails = response.body[dataKey];
      }
    } else {
      taskDetails = response.body;
    }
    yield put({ type: 'TASK:FETCH:SUCCESS', taskDetails });
  } catch (err) {
    console.log(err);
    yield put({ type: 'TASK:FETCH:FAIL', error: err.message });
  }
}

export const sagas = [
  function*() {
    yield takeEvery('TASK:REQUEST_INIT', fetchTaskDetails);
  }
];

export default sagas;
