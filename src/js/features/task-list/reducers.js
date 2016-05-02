import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    isFetching: false,
    columns: Immutable.fromJS([
      {
        label: 'My tasks',
        key: 'taskAssignedTo'
      },
      {
        label: 'Name',
        key: 'taskName'
      },
      {
        label: 'Case',
        key: 'taskCase'
      },
      {
        label: 'Due date',
        key: 'taskDueDate'
      }
    ]),
    tasks: Immutable.fromJS([]),
    error: Immutable.Map({
      message: '',
      isError: false
    })
  }
);

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASK_LIST:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));

    case 'TASK_LIST:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('tasks', Immutable.fromJS(action.tasks));

    case 'TASK_LIST:FETCH:FAIL':
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
