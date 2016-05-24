import Immutable from 'immutable';
const defaultState = Immutable.fromJS(
  {
    isFetching: false,
    taskDetails: {},
    error: {
      message: '',
      isError: false
    },

    transition: {
      onGoing: false,
      error: {
        message: '',
        isError: false
      }
    }
  }
);

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASK:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'))
        .set('taskDetails', defaultState.get('taskDetails'));

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

    case 'TASK:TRANSITION':
      return state
        .setIn(['transition', 'onGoing'], true)
        .setIn(['transition', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:TRANSITION:SUCCESS':
      return state
        .setIn(['transition', 'onGoing'], false)
        .setIn(['transition', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:TRANSITION:FAIL':
      return state
        .setIn(['transition', 'onGoing'], false)
        .setIn(['transition', 'error'], Immutable.Map({
          message: action.error,
          isError: true
        }));

    default :
      return state;
  }
};
