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
    if (response.body[dataKey]) {
      taskDetails = response.body[dataKey];
    }
    yield put({ type: 'TASK:FETCH:SUCCESS', taskDetails });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'TASK:FETCH:FAIL', error: err.message });
  }
}

export function* transitionToState(action) {
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASK:TRANSITION', taskId: action.taskId });

  try {
    // TODO check if the caseLastModified should be put for the post
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const taskData = action.taskData || null;
    const transition = action.transition;
    const response = yield registry.get('request')
      .post(`${config.tasks.url}/${action.taskId}/${transition}`, taskData, headers);

    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);

    yield put(notifySuccess('The transition has been accepted'));
    yield put({
      type: 'TASK:TRANSITION:SUCCESS',
      taskId: action.taskId,
      caseLastModified
    });

    // Redirect to tasks UI, if task is completed.
    if (transition === 'complete' || transition === 'terminate') {
      const store = registry.get('store');
      store.dispatch(pushRouter('#/'));
    } else {
      // FIXME - Removed case last modified for now, need to be added later
      yield put({ type: 'TASK:REQUEST_INIT', taskId: action.taskId });
      yield put({ type: 'CASE:REQUEST_INIT', caseId: action.caseId });
    }
  } catch (err) {
    registry.get('logger').error(err);
    notifyDanger('Unable to apply transition');
    yield put({ type: 'TASK:TRANSITION:FAIL', error: err.message });
  }
}

export function* saveTaskDetails(action) {
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'TASK:SAVE', taskId: action.taskId });

  try {
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const response = yield registry.get('request')
      .put(`${config.tasks.url}/${action.taskId}`, action.taskData, headers);

    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);

    yield put(notifySuccess('The task has been saved'));
    yield put({
      type: 'TASK:SAVE:SUCCESS',
      taskId: action.taskId,
      caseLastModified
    });

    // FIXME - Removed case last modified for now, need to be added later
    yield put({ type: 'TASK:REQUEST_INIT', taskId: action.taskId });
  } catch (err) {
    registry.get('logger').error(err);
    notifyDanger('Unable to save task');
    yield put({ type: 'TASK:SAVE:FAIL', error: err.message });
  }
}
