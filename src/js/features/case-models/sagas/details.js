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
    const reqOptions = helpers.addHeadersByName(['qollaborAuth']);
    Object.assign(reqOptions.headers, defaultXMLGetHeaders);

    const name = store.getState().casemodel.details.get('name');
    const response = yield registry.get('request').get(`${config.casemodeldetail.url}/${name}`, null, reqOptions);
    const jsonObj = parse(response.body.content).root.children;

    // Get case model input schema from casemodel definition -> case -> extensionElements
    let caseModelSchema = null;
    const caseModelItem = jsonObj.find(elmt => elmt.name === 'case');
    if (caseModelItem && caseModelItem.children) {
      const extensionElements = caseModelItem.children.find(elmt => elmt.name === 'extensionElements');
      if (extensionElements && extensionElements.children) {
        // Parse case model schema xml as json
        const caseModelSchemaContent = extensionElements.children.find(elmt =>
            elmt.name.endsWith('start-case-model'));
        caseModelSchema = caseModelSchemaContent ?
          JSON.parse(caseModelSchemaContent.content.replace(/&quot;/g, '"')) : null;
      }
    }

    yield put({ type: 'CASEMODEL:DETAIL:FETCH:SUCCESS', data: jsonObj, caseModelSchema });

    const description = store.getState().casemodel.details.get('data').description;

    yield put({ type: 'APP:BREADCRUMB:SET',
      breadcrumbItem:
        { label: 'Start Case', url: '#/casemodels', description }
    });
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:DETAIL:FETCH:FAIL', error: err.message });
  }
}

// Reverse the case team items to array of {user: '', roles: []}
function getCaseTeam(caseTeamItems) {
  let caseTeamMembers = [];
  caseTeamItems.forEach((caseTeamItem, role) => {
    caseTeamItem.forEach((caseTeam) => {
      const caseTeamIndex = caseTeamMembers.findIndex(elmt => elmt.user === caseTeam.uniqueId);
      // If user exist, get the role and add it to caseTeamMembers map.
      if (caseTeamIndex !== -1) {
        const caseTeamRoles = caseTeamMembers[caseTeamIndex].roles;
        caseTeamRoles.push(role);
        caseTeamMembers.splice(caseTeamIndex, 1, { user: caseTeam.uniqueId, roles: caseTeamRoles });
      } else {
        // if role is empty, set empty array
        const caseTeamRoles = (role === '') ? [] : [role];
        caseTeamMembers = caseTeamMembers.concat({ user: caseTeam.uniqueId, roles: caseTeamRoles });
      }
    });
  });

  return caseTeamMembers;
}

export function* startCaseModel() {
  const store = registry.get('store');
  const config = registry.get('config');
  const helpers = registry.get('helpers');

  try {
    const headers = helpers.addHeadersByName(['qollaborAuth']);

    const caseModelDetails = store.getState().casemodel.details;
    const caseTeamItems = store.getState().casemodel.caseTeam.get('roles');

    const requestPayload = {
      definition: caseModelDetails.get('definition'),
      name: caseModelDetails.get('data').name,
      inputs: caseModelDetails.get('caseData'),
      caseTeam: {
        members: getCaseTeam(caseTeamItems)
      }
    };

    const response = yield registry.get('request')
      .post(`${config.cases.url}`, requestPayload, headers);

    switch (response.status) {
      case 200:
      case 201: {
        const caseId = response.body.caseInstanceId;
        const caseLastModified = response.headers.get(config.cases.lastModifiedHttpHeader);
        yield put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified });
        yield put({ type: 'CASEMODEL:START:SUCCESS', caseId, caseLastModified });
        break;
      }
      default:
        yield put({ type: 'CASEMODEL:START:FAIL', error: response.body });
        break;
    }
  } catch (err) {
    registry.get('logger').error(err);
    yield put({ type: 'CASEMODEL:START:FAIL', error: err.message });
  }
}
