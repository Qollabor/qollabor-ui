import Immutable from 'immutable';

const defaultState = Immutable.Map({
  current: 0,
  notifications: Immutable.List()
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    /* eslint-disable no-case-declarations */
    case 'NOTIFIER:NOTIFY':
      const newMessage = {
        message: action.message,
        key: state.get('current') + 1,
        level: action.level,
        action: 'X',
        dismissAfter: action.dismissAfter || 3000
      };

      return state
        .update('notifications', notifications => notifications.push(newMessage))
        .update('current', current => current + 1);
    /* eslint-enable no-case-declarations */

    case 'NOTIFIER:REMOVE':
      return state
        .update('notifications', notifications => notifications.filter(item => action.key !== item.key));

    default :
      return state;
  }
};
