import { initAppFlow } from './initAppFlow';
function* rootSaga() {
  yield [
    initAppFlow()
  ];
}

export default rootSaga;
