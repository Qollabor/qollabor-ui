import Immutable from 'immutable';

const defaultState = Immutable.fromJS([
  {
    label: 'Task name',
    key: 'taskName',
    visible: true
  },
  {
    label: 'Case',
    key: 'caseDefinition',
    visible: true
  },
  {
    label: 'Case ID',
    key: 'caseInstanceId',
    visible: false
  },
  {
    label: 'Time Remaining',
    key: 'dueDate',
    visible: true
  },
  {
    label: 'Creation date',
    key: 'createdOn',
    visible: true
  }
]);

const visibleColumnCount = state => state.count(item => item.get('visible'));

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'TASKS:COLUMNS:TOGGLE_VISIBILITY': {
      const index = state.findIndex(item => item.get('key') === action.columnName);

      // Unluckily the ImmutableJS list implementation will accept negative numbers and update unwanted columns
      // if this is not check
      if (index === -1) {
        throw new Error(`Wrong column name passed [${action.columnName}]`);
      }

      return state.update(
        index,
        (foundColumn) => {
          const count = visibleColumnCount(state);

          if (foundColumn.get('visible') && count === 1) {
            return foundColumn;
          }

          return foundColumn.set('visible', !foundColumn.get('visible'));
        }
      );
    }

    default:
      return state;
  }
};
