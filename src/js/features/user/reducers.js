import Immutable from 'immutable';
const defaultState = Immutable.fromJS(
  {
    loggedUser: null,
    hidePasswordForm: false,
    hideProfileForm: false,
    error: {
      message: '',
      isError: false
    },
    profile: null
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


    case 'USER:CHANGE_PASSWORD:INIT':
      return state.set('hidePasswordForm', false)
                  .set('error', Immutable.fromJS(defaultState.get('error')));
    case 'USER:CHANGE_PASSWORD':
      return state.set('oldPassword', action.oldPassword)
                  .set('newPassword', action.newPassword)
                  .set('error', Immutable.fromJS(defaultState.get('error')));
    case 'USER:CHANGE_PASSWORD:SUCCESS':
      return state.set('hidePasswordForm', true);
    case 'USER:CHANGE_PASSWORD:FAIL':
      return state.set('error', Immutable.fromJS({ message: action.error, isError: true }));


    case 'USER:PROFILE:INIT':
      return state.set('hideProfileForm', false)
                  .set('error', Immutable.fromJS(defaultState.get('error')));
    case 'USER:PROFILE:FETCH':
      return state.set('isFetching', true);
    case 'USER:PROFILE:FETCH:SUCCESS':
      return state.set('isFetching', false).
        set('profile', action.data);
    case 'USER:PROFILE:UPDATE':
      return state.set('data', action.data)
                  .set('profile', action.data);
    case 'USER:PROFILE:UPDATE:SUCCESS':
      return state.set('data', action.data)
                  .set('profile', action.data)
                  .set('hideProfileForm', true);
    case 'USER:PROFILE:UPDATE:FAIL':
      return state.set('error', Immutable.Map({ message: action.error, isError: true }));
    default :
      return state;
  }
};
