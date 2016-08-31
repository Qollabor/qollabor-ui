import { connect } from 'react-redux';
import moment from 'moment';
import { TaskList as TaskListComponent } from './tasks';

function mapStateToProps(state) {
  return {
    items: state.tasks.list.get('items').toJS(),
    columns: state.tasks.columns.toJS(),
    isFetching: state.tasks.list.get('isFetching'),
    sortKey: state.tasks.list.get('sortKey'),
    sortDesc: state.tasks.list.get('sortDesc'),
    error: state.tasks.list.get('error').toJS(),
    showDrawer: state.app.get('showDrawer')
  };
}

function mapDispatchToProps(dispatch) {
  const timeZoneOffset = moment().format('Z');
  return {
    onTaskRowClick: (id, caseId) => {
      dispatch({ type: 'TASKS:LIST:TASK_ROW_CLICKED', id, caseId });
    },
    onMount: () => {
      dispatch({ type: 'TASKS:LIST:REQUEST_INIT', timeZone: timeZoneOffset });
    },
    sortBy: (sortKey) => {
      dispatch({ type: 'TASKS:LIST:SORT', sortKey });
    },
    onColumnVisibilityToggle: (column) => {
      dispatch({ type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: column.key });
    },
    executeTaskAction: (taskId, taskAction, assignee) => {
      dispatch({ type: 'TASK:ITEM:REQUEST_EXECUTE_ACTION', taskId, taskAction, assignee });
    }
  };
}

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
