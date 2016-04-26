import { take, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* initAppFlow() {
  yield take('APP:INIT');
  yield delay(200, 42);
  yield put({ type: 'APP:INIT:SUCCESS' });
}
