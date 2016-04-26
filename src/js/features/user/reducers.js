import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    user: null,
    isLoggingIn: false
  }
);

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'USER:LOGIN':
      return state.set('isLoggingIn', true);

    default :
      return state;
  }
};
