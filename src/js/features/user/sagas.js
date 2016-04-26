import { take, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* loginFlow() {
  yield take('USER:LOGIN');
  yield delay(200, 42);
  yield put({ type: 'USER:LOGIN:SUCCESS' });
}

function* userSaga() {
  yield [
    loginFlow()
  ];
}

export default userSaga;
