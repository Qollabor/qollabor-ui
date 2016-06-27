import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  currentTasksFilter: {
    id: 'myTasks',
    label: 'My Tasks',
    filter: ['myTasks']
  },
  tasksFilterTypes: [
    {
      id: 'myTasks',
      icon: 'view_list',
      label: 'My Tasks',
      color: '#388AC3',
      filter: ['myTasks']
    },
    {
      id: 'dueDate',
      icon: 'query_builder',
      label: 'Due Today',
      color: '#F3974F',
      filter: ['due']
    },
    {
      id: 'completed',
      icon: 'done_all',
      label: 'Completed',
      color: '#82B75A',
      filter: ['completed']
    },
    {
      id: 'terminated',
      icon: 'clear',
      label: 'Terminated',
      color: '#919191',
      filter: ['terminated']
    },
    {
      id: 'groupTasks',
      icon: 'group',
      label: 'Group Tasks',
      color: '#ACCFEB',
      filter: ['unassigned']
    }
  ]
});

function keyIn(...keys) {
  const keySet = Immutable.Set(keys);
  return function (v, k) {
    return keySet.has(k);
  };
}

const noFilterFoundValue = [-1, Immutable.fromJS({
  id: 'not_found',
  label: 'No Filter',
  filter: []
})];

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:FILTERS:CHANGE':
      return state.set('currentTasksFilter',
        state.get('tasksFilterTypes')
          .findEntry((item) => item.get('id') === action.tasksFilterName, null, noFilterFoundValue)
          .pop()
          .filter(keyIn('id', 'label', 'filter')));

    default:
      return state;
  }
};
