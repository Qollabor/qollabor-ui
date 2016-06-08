import { takeEvery } from 'redux-saga';

import { loginFlow, refreshFlow } from '../features/login';
import { logoutFlow, setLoggedUserFlow, unsetLoggedUserFlow } from '../features/user';
import { fetchTasks, viewTasks } from '../features/tasks';
import { fetchTaskDetails, viewTask, transitionToState } from '../features/task';
import { fetchCase, fetchDiscretionaryItems, planDiscretionaryItem } from '../features/case';
import { resetAndfetchCaseModels, fetchCaseModelDetails, startCaseModel } from '../features/case-models';

const sagas = [
  // Login
  [takeEvery, 'LOGIN:DO_LOGIN', loginFlow],
  [takeEvery, 'LOGIN:VERIFY', refreshFlow],
  // user
  [takeEvery, 'USER:DO_LOGOUT', logoutFlow],
  [takeEvery, ['LOGIN:VERIFY:SUCCESS', 'LOGIN:DO_LOGIN:SUCCESS'], setLoggedUserFlow],
  [takeEvery, ['LOGIN:VERIFY:FAIL', 'LOGIN:DO_LOGIN:FAIL'], unsetLoggedUserFlow],
  // tasks
  [takeEvery, 'TASKS:LIST:REQUEST_INIT', fetchTasks],
  [takeEvery, 'TASKS:FILTERS:CHANGE', fetchTasks],
  [takeEvery, 'TASKS:LIST:TASK_ROW_CLICKED', viewTasks],
  // task
  [takeEvery, 'TASK:REQUEST_INIT', fetchTaskDetails],
  [takeEvery, 'TASK:TASKLIST:VIEW_TASK', viewTask],
  [takeEvery, 'TASK:REQUEST_TRANSITION', transitionToState],
  // case
  [takeEvery, 'CASE:REQUEST_INIT', fetchCase],
  [takeEvery, 'CASE:REQUEST_INIT', fetchDiscretionaryItems],
  [takeEvery, 'CASE:DISCRETIONARY_ITEMS:REQUEST_PLAN', planDiscretionaryItem],
  // case model
  [takeEvery, 'CASEMODEL:LIST:INIT', resetAndfetchCaseModels],
  [takeEvery, 'CASEMODEL:DETAIL:INIT', fetchCaseModelDetails],
  [takeEvery, 'CASEMODEL:START', startCaseModel]


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
