import Immutable from 'immutable';
const defaultState = Immutable.fromJS(
  {
    isFetching: false,
    taskDetails: [],
    error: {
      message: '',
      isError: false
    }
  }
);

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASK:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'TASK:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('taskDetails', Immutable.fromJS(action.taskDetails));

    case 'TASK:FETCH:FAIL':
      return state
        .set('isFetching', false)
        .set('error', Immutable.Map({
          message: action.error,
          isError: true
        }));

    default :
      return state;
  }
};
