import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import parse from 'xml-parser';

const defaultXMLGetHeaders = {
  Accept: 'application/xml',
  'Content-Type': 'application/xml'
};

export function* fetchCaseModelDetails() {
  const store = registry.get('store');
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  yield put({ type: 'CASEMODEL:DETAIL:FETCH' });

  try {
    const reqOptions = helpers.addHeadersByName(['cafienneAuth']);
    Object.assign(reqOptions.headers, defaultXMLGetHeaders);

    const name = store.getState().casemodel.details.get('name');
    const response = yield registry.get('request').get(`${config.casemodeldetail.url}/${name}`, null, reqOptions);
    const jsonObj = parse(response.body.content).root.children;

    let caseModelSchema;
    try {
      const caseModelItem = jsonObj.find((elmt) => elmt.name === 'case');
      const caseName = caseModelItem ? caseModelItem.attributes.name.toLowerCase() : '';
      // eslint-disable-next-line
      caseModelSchema = require(`../../../schemas/${caseName}.json`);
    } catch (err) {
      // eslint-disable-next-line
      caseModelSchema = require('../../../schemas/default.json');
    }

    yield put({ type: 'CASEMODEL:DETAIL:FETCH:SUCCESS', data: jsonObj, caseModelSchema });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:DETAIL:FETCH:FAIL', error: err.message });
  }
}

export function* startCaseModel() {
  const store = registry.get('store');
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  try {
    const headers = helpers.addHeadersByName(['cafienneAuth']);

    const caseModelDetails = store.getState().casemodel.details;

    const requestPayload = Object.assign({
      definition: caseModelDetails.get('definition'),
      name: caseModelDetails.get('data').name
    }, caseModelDetails.get('caseData'));

    const response = yield registry.get('request')
      .post(`${config.cases.url}`, requestPayload, headers);

    const caseInstanceId = response.body.caseInstanceId;
    const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);

    yield fetchCaseDetail(caseInstanceId, caseLastModified);
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:START:FAIL', error: err.message });
  }
}

function* fetchCaseDetail(caseInstanceId, caseLastModified) {
  try {
    const config = registry.get('config');
    const helpers = registry.get('helpers');
    const dataKey = '_2';

    const headers = helpers.addHeadersByName(['cafienneAuth', 'caseLastModified'], {
      caseLastModified
    });

    const response = yield registry.get('request')
      .get(`${config.cases.url}/${caseInstanceId}`, null, headers);

    let theCase = {};

    if (config.cases.version === 1) {
      if (response.body[dataKey]) {
        theCase = response.body[dataKey];
      }
    } else if (response.body) {
      const sanitizeAfterLoad = registry.get('helpers').task.sanitizeAfterLoad;
      response.body.planitems = response.body.planitems.map(sanitizeAfterLoad);
      theCase = response.body;
    }

    yield put({ type: 'CASEMODEL:START:SUCCESS', case: theCase });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:START:FAIL', error: err.message });
  }
}

