import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import moment from 'moment';
import generateFilter from './helpers/generateFilter';
import calcTaskStatus from './helpers/calcTaskStatus';
import { push as pushRouter } from 'react-router-redux';

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
          task.dueDate = moment(task.dueDate, moment.ISO_8601).format('ddd, MMMM Do YYYY');
          task.createdOn = moment(task.createdOn, moment.ISO_8601).format('ddd, MMMM Do YYYY');
          return task;
        }
      );
    }

    yield put({ type: 'TASKS:LIST:FETCH:SUCCESS', tasks });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'TASKS:LIST:FETCH:FAIL', error: err.message });
  }
}

export function* viewTasks(action) {
  const store = registry.get('store');
  store.dispatch(pushRouter(`/tasks/${action.id}?caseId=${action.caseId}`));
}
