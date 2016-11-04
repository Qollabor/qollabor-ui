import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  items: Immutable.fromJS([]),
  error: Immutable.Map({
    isError: false,
    message: ''
  }),
  caseInstanceId: undefined
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASE:DISCRETIONARY_ITEMS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'))
        .set('caseInstanceId', defaultState.get('caseInstanceId'));

    case 'CASE:DISCRETIONARY_ITEMS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', Immutable.fromJS(action.discretionaryItems))
        .set('caseInstanceId', action.caseInstanceId);

    case 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL':
      return state
        .set('isFetching', false)
        .set('error', Immutable.Map({
          isError: true,
          message: action.error
        }));

    default:
      return state;
  }
};
