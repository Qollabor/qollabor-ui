import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  isFetching: false,
  items: [],
  error: {
    message: '',
    isError: false
  },
  taskAction: {
    onGoing: false,
    error: {
      message: '',
      isError: false
    }
  }
});

const getUpdatedTaskInstance = (items, updatedItem) => {
  const updatedIndex = items.findIndex((item) => item.get('id') === updatedItem.id);
  const updatedItems = items.set(updatedIndex, updatedItem);
  return Immutable.fromJS(updatedItems.toJS());
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:LIST:SORT':
      return state
        .set('sortKey', action.sortKey)
        .set('sortDesc', (action.sortKey === state.get('sortKey')) ? !state.get('sortDesc') : false);
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
    case 'TASK:ITEM:FETCH:SUCCESS':
      return state
        .setIn(['taskAction', 'onGoing'], false)
        .set('items', getUpdatedTaskInstance(state.get('items'), action.taskDetails));
    case 'TASK:ITEM:EXECUTE_ACTION':
      return state
        .setIn(['taskAction', 'onGoing'], true)
        .setIn(['taskAction', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:ITEM:EXECUTE_ACTION:SUCCESS':
      return state
        .setIn(['taskAction', 'onGoing'], false)
        .setIn(['taskAction', 'error'], defaultState.getIn(['transition', 'error']));

    case 'TASK:ITEM:EXECUTE_ACTION:FAIL':
      return state
        .setIn(['taskAction', 'onGoing'], false)
        .setIn(['taskAction', 'error'], Immutable.Map({
          message: action.error,
          isError: true
        }));

    default :
      return state;
  }
};
