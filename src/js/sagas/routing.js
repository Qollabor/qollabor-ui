import { put } from 'redux-saga/effects';

export function* updateRoute(action) {
  const pathname = action.payload.pathname;

  // if routing to root url or tasks suburl need to set case redirect to true
  // for redirecting after task is marked completed
  if (pathname.match(/^\/$|^\/tasks$/)) {
    yield put({ type: 'TASK:SET_REDIRECT', redirectToCase: false });
  }

  // Clear out any task details if we are navigating to cases/case viewTask
  // This ensures the correct breadcrumb will show up for a task and case.
  if (pathname.startsWith('/cases')) {
    yield put({ type: 'TASK:DETAIL:RESET' });
  }

  if (pathname.startsWith('/cases/')) {
    const caseId = pathname.substring(pathname.lastIndexOf('/') + 1);
    yield put({ type: 'TASK:SET_REDIRECT', redirectToCase: true });
    yield put({ type: 'CASE:REQUEST_INIT', caseId });
  }
}
