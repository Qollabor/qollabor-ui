import Immutable from 'immutable';

const defaultState = Immutable.Map({
  isFetching: false,
  items: [],
  error: {
    isError: false,
    message: ''
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASE:DISCRECTIONARY_ITEMS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:DISCRECTIONARY_ITEMS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('item', action.discretionaryItems);

    case 'CASE:DISCRECTIONARY_ITEMS:FETCH:FAIL':
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
