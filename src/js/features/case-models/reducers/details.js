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
  const caseModelItem = responseData.find((elmt) => elmt.name === 'case');

  return caseModelItem ? caseModelItem.attributes : {};
};

const defaultState = Immutable.fromJS({
  isFetching: false,
  data: {},
  definition: undefined,
  name: undefined,
  showFeedbackForm: false,
  error: {
    message: '',
    isError: false
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASEMODEL:DETAIL:INIT':
      return state.set('showFeedbackForm', false).set('definition', action.definition).set('name', action.name);
    case 'CASEMODEL:DETAIL:FETCH':
      return state.set('isFetching', true);
    case 'CASEMODEL:DETAIL:FETCH:SUCCESS':
      return state.set('isFetching', false).
        set('data', getCaseModelDetail(action.data));
    case 'CASEMODEL:DETAIL:FETCH:FAIL':
      return state.set('isFetching', false)
                  .set('error', Immutable.Map({ message: action.error, isError: true }));
    case 'CASEMODEL:DETAIL:RESET':
      return state.set('showFeedbackForm', false);
    case 'CASEMODEL:START':
      return state.set('isFetching', true);
    case 'CASEMODEL:START:SUCCESS':
      return state.set('isFetching', false).set('showFeedbackForm', true);
    case 'CASEMODEL:START:FAIL':
      return state.set('isFetching', false).set('error', Immutable.Map({ message: action.error, isError: true }));
    default:
      return state;
  }
};
