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
    onRowClick: (id) => {
      dispatch({ type: 'TASKS:LIST:TASK_ROW_CLICKED', id });
    },
    onMount: () => {
      dispatch({ type: 'TASKS:LIST:REQUEST_INIT' });
    }
  };
}

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
