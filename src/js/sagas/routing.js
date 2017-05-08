import { put } from 'redux-saga/effects';

export function* updateRoute(action) {
  const pathname = action.payload.pathname;

  // if routing to root url or tasks suburl need to set case redirect to true
  // for redirecting after task is marked completed
  if (pathname.match(/^\/$|^\/tasks$/)) {
    yield put({ type: 'TASK:SET_REDIRECT', redirectToCase: false });
  }

  if (pathname.startsWith('/cases/')) {
    const caseId = pathname.substring(pathname.lastIndexOf('/') + 1);
    yield put({ type: 'TASK:SET_REDIRECT', redirectToCase: true });
    yield put({ type: 'CASE:REQUEST_INIT', caseId });
  }
}
