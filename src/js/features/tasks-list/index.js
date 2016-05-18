import { connect } from 'react-redux';

import { TaskList as TaskListComponent } from './components/taskList';

function mapStateToProps(state) {
  return {
    tasks: state.tasks.list.get('items').toJS(),
    columns: state.tasks.columns.toJS(),
    isFetching: state.tasks.list.get('isFetching'),
    error: state.tasks.list.get('error').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRowClick: (id, caseId) => {
      dispatch({ type: 'TASKS:LIST:TASK_ROW_CLICKED', id, caseId });
    },
    onMount: () => {
      dispatch({ type: 'TASKS:LIST:REQUEST_INIT' });
    },
    onColumnVisibilityToggle: (column) => {
      dispatch({ type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: column.key });
    }
  };
}

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
