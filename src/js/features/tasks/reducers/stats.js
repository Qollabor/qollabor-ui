import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  stats: undefined,
  error: {
    message: '',
    isError: false
  },
  bounce: false
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:STATS:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'))
        .set('bounce', defaultState.get('bounce'));

    case 'TASKS:STATS:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('stats', Immutable.fromJS(action.stats))
        .set('bounce', action.bounce);
    case 'TASKS:STATS:FETCH:FAIL':
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
