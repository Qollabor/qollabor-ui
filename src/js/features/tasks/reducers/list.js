import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  items: [],
  error: {
    message: '',
    isError: false
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:LIST:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'TASKS:LIST:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', Immutable.fromJS(action.tasks));

    case 'TASKS:LIST:FETCH:FAIL':
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
