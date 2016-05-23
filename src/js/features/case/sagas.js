import { put } from 'redux-saga/effects';
import registry from 'app-registry';

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
  put({ type: 'CASE:ACTIVE_TASKS:FETCH:SUCCESS', activeTasks: theCase.plan.items.filter(activeTasksFilter) }),
  put({ type: 'CASE:COMPLETED_TASKS:FETCH:SUCCESS', completedTasks: theCase.plan.items.filter(completedTasksFilter) }),
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
      theCase = response.body;
    }

    yield* successFunc(theCase);
  } catch (err) {
    yield* errorFunc(err.message);
  }
}

export function* fetchDiscrectionaryItems(action) {
  if (!action || !action.caseId) {
    yield put({
      type: 'CASE:DISCRECTIONARY_ITEMS:FETCH:FAIL',
      error: 'Must specify a caseId for the discrectionary items to fetch'
    });
  }

  try {
    const config = registry.get('config');
    const store = registry.get('store');
    const dataKey = 'discrectionaryItems';

    yield put({ type: 'CASE:DISCRECTIONARY_ITEMS:FETCH' });

    const response = yield registry.get('request')
      .get(`${config.cases.url}/${action.caseId}/discrectionaryitems`, null, {
        headers: {
          [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
        }
      });

    let discrectionaryItems = [];
    if (config.cases.version === 1) {
      if (response.body[dataKey]) {
        discrectionaryItems = response.body[dataKey];
      }
    } else if (response.body) {
      discrectionaryItems = response.body;
    }

    yield put({ type: 'CASE:DISCRECTIONARY_ITEMS:FETCH:SUCCESS', discrectionaryItems });
  } catch (err) {
    yield put({ type: 'CASE:DISCRECTIONARY_ITEMS:FETCH:FAIL', error: err.message });
  }
}
