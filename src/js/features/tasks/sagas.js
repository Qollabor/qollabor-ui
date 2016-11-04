import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import { push as pushRouter } from 'react-router-redux';
import moment from 'moment';

export function* fetchTasks(action) {
  const store = registry.get('store');
  const dataKey = '_2';
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASKS:LIST:FETCH' });

  try {
    const filterParams = {
      userId: store.getState().user.getIn(['loggedUser', 'username']),
      today: moment().add('days', 1).format('YYYY-MM-DD')
    };
    const filters = registry.get('helpers').task.generateRequestFilters(
      store.getState().tasks.filters.getIn(['currentTasksFilter', 'filter']), filterParams);

    const sortParams = {
      sortBy: store.getState().tasks.list.get('sortKey'),
      sortOrder: store.getState().tasks.list.get('sortDesc') === true ? 'DESC' : 'ASC'
    };
    Object.assign(filters, sortParams);

    const reqOptions = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'],
      { caseLastModified: action.caseLastModified });
    Object.assign(reqOptions.headers, { timeZone: action.timeZone });

    const response = yield registry.get('request')
      .get(config.tasks.url, filters, reqOptions);

    let tasks = [];

    const sanitizeAfterLoad = registry.get('helpers').task.sanitizeAfterLoad;
    if (config.tasks.version === 1) {
      if (response.body[dataKey]) {
        tasks = response.body[dataKey].map(sanitizeAfterLoad);
      }
    } else if (response.body.tasks) {
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

import { notifySuccess, notifyDanger } from '../notifier';

export function* fetchTask(taskId, caseLastModified) {
  const dataKey = '_2';
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASK:FETCH' });

  try {
    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'],
      { caseLastModified });

    const response = yield registry.get('request')
      .get(`${config.tasks.url}/${taskId}`, null, headers);

    let taskDetails = [];

    const sanitizeAfterLoad = registry.get('helpers').task.sanitizeAfterLoad;
    if (config.tasks.version === 1) {
      if (response.body[dataKey]) {
        taskDetails = sanitizeAfterLoad(response.body[dataKey]);
      }
    } else {
      taskDetails = sanitizeAfterLoad(response.body);
    }
    yield put({ type: 'TASK:FETCH:SUCCESS', taskDetails });
    yield put({ type: 'TASK:ITEM:FETCH:SUCCESS', taskDetails });
  } catch (err) {
    yield put({ type: 'TASK:FETCH:FAIL', error: err.message });
  }
}

export function* executeTaskAction(action) {
  const config = registry.get('config');
  const helpers = registry.get('helpers');


  yield put({ type: 'TASK:ITEM:EXECUTE_ACTION', taskId: action.taskId, taskAction: action.taskAction });

  const userData = {
    assignee: action.assignee ? action.assignee.uniqueId : ''
  };

  try {
    // TODO check if the caseLastModified should be put for the post
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const response = yield registry.get('request')
      .put(`${config.tasks.url}/${action.taskId}/${action.taskAction}`, userData, headers);

    switch (response.status) {
      case 200:
      case 202: {
        const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);
        yield put(notifySuccess('The action has been accepted'));
        yield put({ type: 'TASK:ITEM:EXECUTE_ACTION:SUCCESS' });
        yield fetchTask(action.taskId, caseLastModified);

        /* Since we are reading task stats from elastic search,
         * Stats count will be updated only after 1 sec.
        */
        setTimeout(() => {
          const store = registry.get('store');
          store.dispatch({ type: 'TASK:STATS:REQUEST_INIT', bounce: true });
        }, 1000);

        break;
      }
      default:
        notifyDanger('Unable to execute action');
        yield put({ type: 'TASK:ITEM:EXECUTE_ACTION:FAIL', error: response.body });
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
    notifyDanger('Unable to execute action');
    yield put({ type: 'TASK:ITEM:EXECUTE_ACTION:FAIL', error: err.message });
  }
}

export function* fetchTasksStats(action) {
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASKS:STATS:FETCH' });

  try {
    const headers = helpers.addHeadersByName(['cafienneAuth']);
    const response = yield registry.get('request')
      .get(`${config.tasks.url}/user/count`, null, headers);
    yield put({ type: 'TASKS:STATS:FETCH:SUCCESS', stats: response.body, bounce: action.bounce });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'TASKS:STATS:FETCH:FAIL', error: err.message });
  }
}

