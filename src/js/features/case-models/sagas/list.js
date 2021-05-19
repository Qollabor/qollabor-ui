import { put } from 'redux-saga/effects';
import registry from 'app-registry';

export function* resetAndfetchCaseModels() {
  yield put({ type: 'CASEMODEL:LIST:REQUEST_INIT' });
  yield fetchCaseModels();
}

export function* fetchCaseModels() {
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'CASEMODEL:LIST:FETCH' });

  yield put({ type: 'APP:BREADCRUMB:SET',
    breadcrumbItem:
      { label: 'Start Case', url: '#/casemodels' }
  });

  try {
    const headers = helpers.addHeadersByName(['qollaborAuth']);
    const response = yield registry.get('request')
      .get(config.casemodels.url, null, headers);

    yield put({ type: 'CASEMODEL:LIST:FETCH:SUCCESS', items: response.body.models });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:LIST:FETCH:FAIL', error: err.message });
  }
}
