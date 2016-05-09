import Immutable from 'immutable';

const defaultState = Immutable.fromJS([
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
    key: 'caseDefinition'
  },
  {
    label: 'Due date',
    key: 'taskDueDate'
  }
]);

export const reducers = (state = defaultState) => state;
