import Immutable from 'immutable';

const defaultState = Immutable.fromJS(
  {
    isFetching: false,
    redirectToCase: false,
    taskDetails: {},
    error: {
      message: '',
      isError: false
    },

    transition: {
      onGoing: false,
      success: false,
      error: {
        message: '',
        isError: false
      }
    },

    save: {
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

    case 'TASK:SET_REDIRECT':
      return state
        .set('redirectToCase', action.redirectToCase);

    case 'TASK:TRANSITION':
      return state
        .setIn(['transition', 'onGoing'], true)
        .setIn(['transition', 'success'], false)
        .setIn(['transition', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:TRANSITION:SUCCESS':
      return state
        .setIn(['transition', 'onGoing'], false)
        .setIn(['transition', 'success'], true)
        .setIn(['transition', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:TRANSITION:FAIL':
      return state
        .setIn(['transition', 'onGoing'], false)
        .setIn(['transition', 'success'], false)
        .setIn(['transition', 'error'], Immutable.Map({
          message: action.error,
          isError: true
        }));

    case 'TASK:SAVE':
      return state
        .setIn(['save', 'onGoing'], true)
        .setIn(['save', 'error'], defaultState.getIn(['save', 'error']));

    case 'TASK:SAVE:SUCCESS':
      return state
        .setIn(['save', 'onGoing'], false)
        .setIn(['save', 'error'], defaultState.getIn(['save', 'error']));

    case 'TASK:SAVE:FAIL':
      return state
        .setIn(['save', 'onGoing'], false)
        .setIn(['save', 'error'], Immutable.Map({
          message: action.error,
          isError: true
        }));

    default :
      return state;
  }
};
