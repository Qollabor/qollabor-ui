import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  item: {},
  error: {
    isError: false,
    message: ''
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASE:ITEM:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:ITEM:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('item', action.case);

    case 'CASE:ITEM:FETCH:FAIL':
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
