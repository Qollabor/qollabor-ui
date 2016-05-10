import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import generateFilter from './helpers/generateFilter';
import calcTaskStatus from './helpers/calcTaskStatus';

export function* fetchTasks() {
  const store = registry.get('store');
  const dataKey = '_2';
  const config = registry.get('config');

  yield put({ type: 'TASKS:LIST:FETCH' });

  try {
    const filterParams = {
      userId: store.getState().user.getIn(['loggedUser', 'username']),
      today: (new Date()).toISOString().substring(0, 10)
    };
    const filters = generateFilter(
      store.getState().tasks.filters.getIn(['currentTasksFilter', 'filter']), filterParams);

    const response = yield registry.get('request')
      .get(config.tasks.url, filters, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    let tasks = [];

    if (config.tasks.version === 1) {
      if (response.body[dataKey]) {
        tasks = response.body[dataKey];
      }
    } else if (response.body.tasks) {
      tasks = response.body.tasks.map(
        task => {
          task.status = calcTaskStatus(task);
          return task;
        }
      );
    }

    yield put({ type: 'TASKS:LIST:FETCH:SUCCESS', tasks });
  } catch (err) {
    console.log(err);
    yield put({ type: 'TASKS:LIST:FETCH:FAIL', error: err.message });
  }
}

export const sagas = [
  function*() {
    yield takeEvery('TASKS:LIST:REQUEST_INIT', fetchTasks);
  },
  function*() {
    yield takeEvery('TASKS:FILTERS:CHANGE', fetchTasks);
  }
];

export default sagas;
