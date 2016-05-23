import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  items: [],
  error: {
    isError: false,
    message: ''
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASE:COMPLETED_TASKS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:COMPLETED_TASKS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', Immutable.fromJS(action.completedTasks));

    case 'CASE:COMPLETED_TASKS:FETCH:FAIL':
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
