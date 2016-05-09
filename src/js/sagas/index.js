import { initAppFlow } from './initAppFlow';
import { sagas as loginSagas } from '../features/login';
import { sagas as userSagas } from '../features/user';

function* rootSaga() {
  yield [
    initAppFlow(),
    ...loginSagas.map(saga => saga.call()),
    ...userSagas.map(saga => saga.call())
  ];
}

export default rootSaga;
