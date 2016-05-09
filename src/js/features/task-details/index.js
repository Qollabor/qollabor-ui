import { connect } from 'react-redux';

import TaskDetailsComponent from './taskDetails.jsx';

function mapStateToProps(state) {
  return {
    taskDetails: state.task.get('taskDetails').toJS(),
    isFetching: state.task.get('isFetching'),
    error: state.task.get('error').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (taskId) => {
      dispatch({ type: 'TASK:REQUEST_INIT', taskId });
    }
  };
}

export const TaskDetails = connect(mapStateToProps, mapDispatchToProps)(TaskDetailsComponent);
