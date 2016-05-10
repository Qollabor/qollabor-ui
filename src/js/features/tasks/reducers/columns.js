import Immutable from 'immutable';

const defaultState = Immutable.fromJS([
  {
    label: 'Assigned to',
    key: 'assignee'
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
    key: 'dueBefore'
  }
]);

export const reducers = (state = defaultState) => state;
