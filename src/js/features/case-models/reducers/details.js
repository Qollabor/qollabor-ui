import Immutable from 'immutable';
/*
case model details reducer sample =>
{
  isFetching : true | false,
  definition: ...,
  showFeedbackForm: true | false,
  error: {
    message: '',
    isError: false
  },
  data : {
    description:"{description}"
    id:"{id}"
    name:"{name}"
  }
}
*/

// Get Case Model Detail
const getCaseModelDetail = (responseData) => {
  const caseModelItem = responseData.find(elmt => elmt.name === 'case');
  if (caseModelItem && caseModelItem.attributes) {
    if (caseModelItem.children) {
      const caseRoles = caseModelItem.children.filter(elmt => elmt.name === 'caseRoles');
      caseModelItem.attributes.roles = {};
      // make sure we have both name and descriptions in the roles object.
      // so we can display the description in the views instead of the name.
      caseModelItem.attributes.roles = caseRoles.reduce((arr, role) => arr.concat({ name: role.attributes.name, description: role.attributes.description }), []);
    }
    return caseModelItem.attributes;
  }
  return {};
};

const defaultState = Immutable.fromJS({
  isFetching: false,
  data: {},
  definition: undefined,
  name: undefined,
  showFeedbackForm: false,
  caseId: undefined,
  caseLastModified: undefined,
  caseData: undefined,
  error: {
    message: '',
    isError: false
  },
  actionError: {
    message: '',
    isError: false
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASEMODEL:DETAIL:INIT':
      return state.set('showFeedbackForm', false).set('definition', action.definition).set('name', action.name);
    case 'CASEMODEL:DETAIL:FETCH':
      return state.set('isFetching', true)
                  .set('error', defaultState.get('error'))
                  .set('data', defaultState.get('data'))
                  .set('caseData', defaultState.get('caseData'))
                  .set('actionError', defaultState.get('actionError'));
    case 'CASEMODEL:DETAIL:FETCH:SUCCESS':
      return state.set('isFetching', false)
                  .set('data', getCaseModelDetail(action.data))
                  .set('caseModelSchema', action.caseModelSchema);
    case 'CASEMODEL:DETAIL:FETCH:FAIL':
      return state.set('isFetching', false)
                  .set('error', Immutable.Map({ message: action.error, isError: true }));
    case 'CASEMODEL:DETAIL:RESET':
      return state.set('showFeedbackForm', defaultState.get('showFeedbackForm'))
                  .set('caseId', defaultState.get('caseId'))
                  .set('caseLastModified', defaultState.get('caseLastModified'))
                  .set('caseData', defaultState.get('caseData'));
    case 'CASEMODEL:START':
      return state.set('isFetching', true)
                  .set('actionError', defaultState.get('actionError'))
                  .set('caseData', action.caseData);
    case 'CASEMODEL:START:SUCCESS':
      return state.set('isFetching', false)
                  .set('showFeedbackForm', true)
                  .set('caseId', action.caseId)
                  .set('caseLastModified', action.caseLastModified);
    case 'CASEMODEL:START:FAIL':
      return state.set('isFetching', false).set('actionError', Immutable.Map({ message: action.error, isError: true }));
    default:
      return state;
  }
};
