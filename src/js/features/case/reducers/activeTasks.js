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
    case 'CASE:ACTIVE_TASKS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:ACTIVE_TASKS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', action.activeTasks);

    case 'CASE:ACTIVE_TASKS:FETCH:FAIL':
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
