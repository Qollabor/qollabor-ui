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
      id: 'groupTasks',
      icon: 'assignment_ind',
      label: 'Unclaimed Tasks',
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
