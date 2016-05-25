import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import { push as pushRouter } from 'react-router-redux';

export function* fetchTasks() {
  const store = registry.get('store');
  const dataKey = '_2';
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASKS:LIST:FETCH' });

  try {
    const filterParams = {
      userId: store.getState().user.getIn(['loggedUser', 'username']),
      today: (new Date()).toISOString().substring(0, 10)
    };
    const filters = registry.get('helpers').task.generateRequestFilters(
      store.getState().tasks.filters.getIn(['currentTasksFilter', 'filter']), filterParams);
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const response = yield registry.get('request')
      .get(config.tasks.url, filters, headers);

    let tasks = [];

    if (config.tasks.version === 1) {
      if (response.body[dataKey]) {
        tasks = response.body[dataKey];
      }
    } else if (response.body.tasks) {
      const sanitizeAfterLoad = registry.get('helpers').task.sanitizeAfterLoad;
      tasks = response.body.tasks.map(sanitizeAfterLoad);
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
