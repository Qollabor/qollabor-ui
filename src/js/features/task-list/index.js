import { connect } from 'react-redux';

import { TaskList as TaskListComponent } from './components/taskList';

export { reducers } from './reducers';

function mapStateToProps(state) {
  return {
    tasks: state.taskList.get('tasks').toJS(),
    columns: state.taskList.get('columns').toJS(),
    isFetching: state.taskList.get('isFetching'),
    error: state.taskList.get('error').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRowClick: (id) => {
      dispatch({ type: 'TASK_LIST:TASK_ROW_CLICKED', id });
    },
    onMount: () => {
      dispatch({ type: 'TASK_LIST:REQUEST_INIT' });
    }
  };
}

export const TaskList = connect(mapStateToProps, mapDispatchToProps)(TaskListComponent);
