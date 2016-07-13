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
    case 'CASE:TEAM:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'CASE:TEAM:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', Immutable.fromJS(action.caseTeam));

    case 'CASE:TEAM:FETCH:FAIL':
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
