import { put } from 'redux-saga/effects';

export function* updateRoute(action) {
  const pathname = action.payload.pathname;

  if (pathname.startsWith('/cases/')) {
    const caseId = pathname.substring(pathname.lastIndexOf('/') + 1);
    yield put({ type: 'CASE:REQUEST_INIT', caseId });
  }
}
