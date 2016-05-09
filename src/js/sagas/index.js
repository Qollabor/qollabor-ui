import { initAppFlow } from './initAppFlow';
import { sagas as loginSagas } from '../features/login';
import { sagas as userSagas } from '../features/user';
import { sagas as tasksSagas } from '../features/tasks';
import { sagas as taskSagas } from '../features/task';

function* rootSaga() {
  yield [
    initAppFlow(),
    ...loginSagas.map(saga => saga.call()),
    ...userSagas.map(saga => saga.call()),
    ...tasksSagas.map(saga => saga.call()),
    ...taskSagas.map(saga => saga.call())
  ];
}

export default rootSaga;
