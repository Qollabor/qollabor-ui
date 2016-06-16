import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { notifySuccess, notifyDanger } from '../notifier';

import { activeTasksFilter, completedTasksFilter } from './helpers/tasksFilters';

const progressFunc = () => [
  put({ type: 'CASE:ITEM:FETCH' }),
  put({ type: 'CASE:ACTIVE_TASKS:FETCH' }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH' }),
  put({ type: 'CASE:ATTACHMENTS:FETCH' })
];

const errorFunc = (error) => [
  put({ type: 'CASE:ITEM:FETCH:FAIL', error }),
  put({ type: 'CASE:ACTIVE_TASKS:FETCH:FAIL', error }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH:FAIL', error }),
  put({ type: 'CASE:ATTACHMENTS:FETCH:FAIL', error })
];

const successFunc = (theCase) => [
  put({ type: 'CASE:ITEM:FETCH:SUCCESS', case: theCase }),
  put({ type: 'CASE:ACTIVE_TASKS:FETCH:SUCCESS', activeTasks: theCase.planitems.filter(activeTasksFilter) }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH:SUCCESS', completedTasks: theCase.planitems.filter(completedTasksFilter) }),
  put({ type: 'CASE:ATTACHMENTS:FETCH:SUCCESS', attachments: theCase.attachments })
];

export function* fetchCase(action) {
  if (!action || !action.caseId) {
    yield* errorFunc('Must specify a caseId to fetch');
    return;
  }

  try {
    const config = registry.get('config');
    const helpers = registry.get('helpers');
    const dataKey = '_2';

    yield* progressFunc();

    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'], {
      caseLastModified: action.caseLastModified
    });

    const response = yield registry.get('request')
      .get(`${config.cases.url}/${action.caseId}`, null, headers);

    let theCase = {};

    if (config.cases.version === 1) {
      if (response.body[dataKey]) {
        theCase = response.body[dataKey];
      }
    } else if (response.body) {
      const sanitizeAfterLoad = registry.get('helpers').task.sanitizeAfterLoad;
      response.body.planitems = response.body.planitems.map(sanitizeAfterLoad);
      theCase = response.body;
    }

    yield* successFunc(theCase);
  } catch (err) {
    yield* errorFunc(err.message);
  }
}

export function* fetchDiscretionaryItems(action) {
  if (!action || !action.caseId) {
    yield put({
      type: 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL',
      error: 'Must specify a caseId for the discretionary items to fetch'
    });
    return;
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');
    const dataKey = 'discretionaryItems';

    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH' });

    const response = yield registry.get('request')
      .get(`${config.cases.url}/${action.caseId}/discretionaryitems`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    let discretionaryItems = [];
    if (config.cases.version === 1) {
      if (response.body[dataKey]) {
        discretionaryItems = response.body[dataKey];
      }
    } else if (response.body) {
      discretionaryItems = response.body;
    }

    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH:SUCCESS', discretionaryItems });
  } catch (err) {
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL', error: err.message });
  }
}

export function* planDiscretionaryItem(action) {
  if (!action || !action.planItemId) {
    yield put({
      type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL',
      error: 'Must specify a plan item id for the discretionary item to plan'
    });
    return;
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');

    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN' });
    const response = yield registry.get('request')
      .post(`${config.cases.url}/${action.caseId}/discretionaryitems/plan`, {
        planItemId: action.planItemId
      }, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);

    yield put(notifySuccess(`Discretionary item ['${action.planItemName}'] has been planned`));
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:SUCCESS' });
    yield put({ type: 'CASE:REQUEST_INIT', caseId: action.caseId, caseLastModified });
  } catch (err) {
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL', error: err.message });
    yield put(notifyDanger(`Error while planning discretionary item ['${action.planItemName}']`));
  }
}
