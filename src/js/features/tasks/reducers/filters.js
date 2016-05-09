import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  currentTasksFilter: 'myTasks',
  tasksFilterTypes: [
    {
      id: 'myTasks',
      icon: 'view_list',
      label: 'My Tasks',
      color: '#FFEB3B'
    },
    {
      id: 'dueDate',
      icon: 'query_builder',
      label: 'Due Date',
      color: '#FFEB3B'
    },
    {
      id: 'completed',
      icon: 'check',
      label: 'Completed',
      color: '#004D40'
    },
    {
      id: 'terminated',
      icon: 'clear',
      label: 'Terminated',
      color: '#E53935'
    }
  ]
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:FILTERS:CHANGE':
      return state.set('currentTasksFilter', action.tasksFilterName);
    default:
      return state;
  }
};
