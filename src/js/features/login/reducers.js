import Immutable from 'immutable';

const defaultState = Immutable.Map({
  isLoggingIn: false,
  isVerifyAuth: false,
  errors: Immutable.Map()
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN:VERIFY':
      return state
        .set('isVerifyAuth', true);

    case 'LOGIN:VERIFY:SUCCESS':
      return state
        .set('isVerifyAuth', false);

    case 'LOGIN:VERIFY:FAIL':
      return state
        .set('isVerifyAuth', false);

    case 'LOGIN:DO_LOGIN':
      return state
        .set('isLoggingIn', true)
        .set('errors', Immutable.Map());

    case 'LOGIN:DO_LOGIN:SUCCESS':
      return state
        .set('isLoggingIn', false);

    case 'LOGIN:DO_LOGIN:FAIL':
      return state
        .set('isLoggingIn', false)
        .set('errors', Immutable.Map({
          username: action.username,
          password: action.password,
          login: action.login
        }));

    case 'LOGIN:LOGIN_REDIRECT_SET':
      return state
        .set('redirectAfterLogin', action.redirect);

    case 'LOGIN:LOGIN_REDIRECT_USE':
      return state
        .set('redirectAfterLogin', null);

    default :
      return state;
  }
};
