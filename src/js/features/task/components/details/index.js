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
    },
    saveTaskDetails: (taskId, taskData) => {
      dispatch({ type: 'TASK:REQUEST_SAVE', taskId, taskData });
    },
    transitionToState: (taskId, caseId, taskData, transition) => {
      dispatch({ type: 'TASK:REQUEST_TRANSITION', taskId, caseId, taskData, transition });
    },
    executeTaskAction: (taskId, taskAction) => {
      dispatch({ type: 'TASK:ITEM:REQUEST_EXECUTE_ACTION', taskId, taskAction });
    }
  };
}

export const Details = connect(mapStateToProps, mapDispatchToProps)(TaskDetailsComponent);
