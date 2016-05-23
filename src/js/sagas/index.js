import { takeEvery, takeLatest } from 'redux-saga';

import { loginFlow, refreshFlow } from '../features/login';
import { logoutFlow, setLoggedUserFlow, unsetLoggedUserFlow } from '../features/user';
import { fetchTasks, viewTasks } from '../features/tasks';
import { fetchTaskDetails, viewTask, transitionToState } from '../features/task';
import { fetchCase, fetchDiscrectionaryItems } from '../features/case';

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
  [takeLatest, 'CASE:REQUEST_INIT', fetchCase],
  [takeLatest, 'CASE:REQUEST_INIT', fetchDiscrectionaryItems]
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
