import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  items: Immutable.fromJS([]),
  error: Immutable.Map({
    isError: false,
    message: ''
  })
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASE:DISCRETIONARY_ITEMS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:DISCRETIONARY_ITEMS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', Immutable.fromJS(action.discretionaryItems));

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
