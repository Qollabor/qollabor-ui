import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    loggedUser: null,
    isChangePassword: false
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

    case 'USER:CHANGE_PASSWORD':
      return state.set('oldPassword', action.oldPassword)
                  .set('newPassword', action.newPassword);

    case 'USER:CHANGE_PASSWORD:SUCCESS':
      return state.set('isChangePassword', true);

    case 'USER:CHANGE_PASSWORD:FAIL':
      return state.set('isChangePassword', false)
                  .set('error', Immutable.Map({ message: action.error, isError: true }));

    default :
      return state;
  }
};
