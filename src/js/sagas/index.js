import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import { loginFlow, refreshFlow, tokenRefreshFlow } from '../features/login';
import { logoutFlow, setLoggedUserFlow, unsetLoggedUserFlow,
         tokenNotValidFlow, changePassword, updateAvatar, fetchProfile, updateProfile } from '../features/user';
import { fetchTasks, viewTasks, executeTaskAction, fetchTasksStats } from '../features/tasks';

import { fetchTaskDetails, viewTask, transitionToState, saveTaskDetails } from '../features/task';
import { fetchCase, fetchCaseTeam, fetchDiscretionaryItems, planDiscretionaryItem } from '../features/case';
import { resetAndfetchCaseModels, fetchCaseModelDetails,
  startCaseModel } from '../features/case-models';
import { resetAndfetchUsersList } from '../components/user-selector/sagas';
import { resetAndSearch, search } from '../features/search';
import { resetAndFetch } from '../features/case-list';
import { updateRoute } from './routing.js';

const sagas = [
  // Login
  [takeEvery, 'LOGIN:DO_LOGIN', loginFlow],
  [takeEvery, 'LOGIN:VERIFY', refreshFlow],
  [takeEvery, 'USER:TOKEN_REFRESH', tokenRefreshFlow],
  // user
  [takeEvery, 'USER:DO_LOGOUT', logoutFlow],
  [takeEvery, ['LOGIN:VERIFY:SUCCESS', 'LOGIN:DO_LOGIN:SUCCESS'], setLoggedUserFlow],
  [takeEvery, ['LOGIN:DO_LOGIN:FAIL', 'LOGIN:VERIFY:FAIL'], unsetLoggedUserFlow],
  [takeEvery, 'LOGIN:TOKEN_REFRESH:FAIL', tokenNotValidFlow],
  [takeEvery, 'USER:CHANGE_PASSWORD', changePassword],
  [takeEvery, 'USER:PROFILE:INIT', fetchProfile],
  [takeEvery, 'USER:PROFILE:UPDATE', updateProfile],
  [takeEvery, 'USER:AVATAR:UPDATE', updateAvatar],
  // tasks
  [takeEvery, 'TASKS:LIST:REQUEST_INIT', fetchTasks],
  [takeEvery, 'TASKS:FILTERS:CHANGE', fetchTasks],
  [takeEvery, 'TASKS:LIST:SORT', fetchTasks],
  [takeEvery, 'TASKS:LIST:TASK_ROW_CLICKED', viewTasks],
  [takeEvery, 'TASK:ITEM:REQUEST_EXECUTE_ACTION', executeTaskAction],
  [takeEvery, 'TASK:STATS:REQUEST_INIT', fetchTasksStats],
  // task
  [takeEvery, 'TASK:REQUEST_INIT', fetchTaskDetails],
  [takeEvery, 'TASK:TASKLIST:VIEW_TASK', viewTask],
  [takeEvery, 'TASK:REQUEST_TRANSITION', transitionToState],
  [takeEvery, 'TASK:REQUEST_SAVE', saveTaskDetails],
  // case
  [takeEvery, 'CASE:REQUEST_INIT', fetchCase],
  [takeEvery, 'CASE:REQUEST_INIT', fetchDiscretionaryItems],
  [takeEvery, 'CASE:TEAM:REQUEST_INIT', fetchCaseTeam],
  [takeEvery, 'CASE:DISCRETIONARY_ITEMS:REQUEST_PLAN', planDiscretionaryItem],
  // case model
  [takeEvery, 'CASEMODEL:LIST:INIT', resetAndfetchCaseModels],
  [takeEvery, 'CASEMODEL:DETAIL:INIT', fetchCaseModelDetails],
  [takeEvery, 'CASEMODEL:START', startCaseModel],
  // user selector
  [takeEvery, 'USERS_SELECTOR:LIST:INIT', resetAndfetchUsersList],
  [takeEvery, 'USERS_SELECTOR:LIST:FILTER', resetAndfetchUsersList],
  // search selector
  [takeEvery, 'SEARCH:LIST:INIT', resetAndSearch],
  [takeEvery, 'SEARCH:LIST:NEXT:FETCH', search],
  // case list
  [takeEvery, 'CASE:LIST:INIT', resetAndFetch],
  [takeEvery, 'CASE:LIST:FILTER_BY_TEXT', resetAndFetch],
  // router
  [takeEvery, LOCATION_CHANGE, updateRoute]
];

function* rootSaga() {
  yield [
    ...sagas
      .map(saga =>
        function*() {
          yield saga[0](saga[1], saga[2]);
        }
      )
      .map(saga => saga.call())
  ];
}

export default rootSaga;
