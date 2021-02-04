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

const errorFunc = error => [
  put({ type: 'CASE:ITEM:FETCH:FAIL', error }),
  put({ type: 'CASE:ACTIVE_TASKS:FETCH:FAIL', error }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH:FAIL', error }),
  put({ type: 'CASE:ATTACHMENTS:FETCH:FAIL', error })
];

const successFunc = theCase => [
  put({ type: 'CASE:ITEM:FETCH:SUCCESS', case: theCase }),
  put({ type: 'CASE:ACTIVE_TASKS:FETCH:SUCCESS', activeTasks: theCase.planitems.filter(activeTasksFilter) }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH:SUCCESS', completedTasks: theCase.planitems.filter(completedTasksFilter) }),
  put({ type: 'CASE:ATTACHMENTS:FETCH:SUCCESS', attachments: theCase.attachments }),
  put({ type: 'CASE:TEAM:REQUEST_INIT', caseTeam: theCase.team })
];

export function* fetchCase(action) {
  if (!action || !action.caseId) {
    yield* errorFunc('Must specify a caseId to fetch');
    return;
  }

  try {
    const config = registry.get('config');
    const helpers = registry.get('helpers');
    const store = registry.get('store');
    const caseLastModified = store.getState().app.get('caseLastModified');
    const dataKey = '_2';

    yield* progressFunc();

    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'], {
      caseLastModified
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

    // Because Case Actions are called after a Task Detail is loaded,
    // we want to make sure we ONLY update the breadcrumb for a case,
    // if we are actually navigating to a case and not already loaded a task.
    const taskDescription = store.getState().task.get('taskDetails').get('taskName');
    if (!taskDescription) {
      yield put({ type: 'APP:BREADCRUMB:SET',
        breadcrumbItem:
          { label: 'My Cases', url: '#/cases', description: theCase.definition }
      });
    }
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
    const helpers = registry.get('helpers');
    const config = registry.get('config');
    const store = registry.get('store');
    const caseLastModified = store.getState().app.get('caseLastModified');
    const dataKey = 'discretionaryItems';

    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'], {
      caseLastModified
    });

    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH' });

    const response = yield registry.get('request')
      .get(`${config.cases.url}/${action.caseId}/discretionaryitems`, null, headers);
    let discretionaryItems = [];
    if (config.cases.version === 1) {
      if (response.body[dataKey]) {
        discretionaryItems = response.body[dataKey];
      }
    } else if (response.body) {
      discretionaryItems = response.body.discretionaryItems;
    }
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH:SUCCESS', discretionaryItems, caseInstanceId: action.caseId });
  } catch (err) {
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL', error: err.message });
  }
}

export function* planDiscretionaryItem(action) {
  if (!action || !action.planItemName || !action.caseId || !action.definitionId || !action.parentId) {
    yield put({
      type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL',
      error: 'Must specify a plan item name, case id, definition id and parent id for the discretionary item to plan'
    });
    return;
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');

    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN' });

    const response = yield registry.get('request')
      .post(`${config.cases.url}/${action.caseId}/discretionaryitems/plan`, {
        name: action.planItemName,
        definitionId: action.definitionId,
        parentId: action.parentId,
        planItemId: action.planItemId
      }, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);
    yield put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified });

    yield put(notifySuccess(`Discretionary item ['${action.planItemName}'] has been planned`));
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:SUCCESS' });
    yield put({ type: 'CASE:REQUEST_INIT', caseId: action.caseId });
  } catch (err) {
    yield put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL', error: err.message });
    yield put(notifyDanger(`Error while planning discretionary item ['${action.planItemName}']`));
  }
}

export function* fetchCaseTeam(action) {
  if (!action || !action.caseTeam) {
    yield put({
      type: 'CASE:TEAM:FETCH:FAIL',
      error: 'Must specify a caseTeam for the caseTeam items to fetch'
    });
    return;
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');

    yield put({ type: 'CASE:TEAM:FETCH' });

    const userIds = action.caseTeam.map(person => person.memberId);

    // TODO: make tenant variable
    const response = yield (userIds.map(userId => registry.get('request')
      .get(`${config.baseApiUrl}tenant/world/users/${userId}`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      })));

    const caseteamItems = response.map(r => r.body);

    yield put({ type: 'CASE:TEAM:FETCH:SUCCESS', caseTeam: caseteamItems });
  } catch (err) {
    yield put({ type: 'CASE:TEAM:FETCH:FAIL', error: err.message });
  }
}

export function* raiseEvent(action) {
  if (!action || !action.caseInstanceId || !action.planItemId || !action.planItemName) {
    yield put({
      type: 'CASE:PLAN_ITEM:RAISE_EVENT:FAIL',
      error: 'Must specify a case instance id, plan item id, plan item name to raise event'
    });
    return;
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');

    yield put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT' });
    const response = yield registry.get('request')
      .post(`${config.cases.url}/${action.caseInstanceId}/planitems/${action.planItemId}/occur`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);
    yield put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified });
    yield put(notifySuccess(`Successfully raised the event ${action.planItemName}`));
    yield put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT:SUCCESS' });
    yield put({ type: 'CASE:REQUEST_INIT', caseId: action.caseInstanceId });
  } catch (err) {
    yield put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT:FAIL', error: err.message });
    yield put(notifyDanger(err.message));
  }
}
