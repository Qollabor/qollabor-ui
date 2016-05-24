import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import { push as pushRouter } from 'react-router-redux';

export function* viewTask(action) {
  const store = registry.get('store');
  store.dispatch(pushRouter(`/tasks/${action.taskId}?caseId=${action.caseId}`));
}

import { notifySuccess, notifyDanger } from '../notifier';

export function* fetchTaskDetails(action) {
  const dataKey = '_2';
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASK:FETCH' });

  try {
    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'],
      { caseLastModified: action.caseLastModified });

    const response = yield registry.get('request')
      .get(`${config.tasks.url}/${action.taskId}`, null, headers);

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
    registry.get('logger').error(err);
    yield put({ type: 'TASK:FETCH:FAIL', error: err.message });
  }
}

export function* transitionToState(action) {
  // const dataKey = '_2';
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASK:TRANSITION', taskId: action.taskId });

  try {
    // TODO check if the caseLastModified should be put for the post
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const response = yield registry.get('request')
      .post(`${config.tasks.url}/${action.taskId}/${action.transition}`, null, headers);

    yield put(notifySuccess('The transition has been accepted'));
    yield put({
      type: 'TASK:TRANSITION:SUCCESS',
      taskId: action.taskId,
      caseLastModified: response.headers.get(config.cases.lastModifiedHttpHeader)
    });

    yield put({ type: 'TASK:REQUEST_INIT', taskId: action.taskId });
    yield put({ type: 'CASE:REQUEST_INIT', caseId: action.caseId });
  } catch (err) {
    registry.get('logger').error(err);
    notifyDanger('Unable to apply transition');
    yield put({ type: 'TASK:TRANSITION:FAIL', error: err.message });
  }
}
