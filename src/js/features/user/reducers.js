import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    loggedUser: null
  }
);

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN:VERIFY:SUCCESS':
    case 'LOGIN:DO_LOGIN:SUCCESS':
      return state.set('loggedUser', Immutable.fromJS(action.user));

    case 'LOGIN:VERIFY:FAIL':
    case 'LOGIN:DO_LOGIN:FAIL':
      return state.set('loggedUser', null);

    case 'USER:SET_LOGGED_USER':
      return state.set('loggedUser', Immutable.fromJS(action.user));

    default :
      return state;
  }
};
