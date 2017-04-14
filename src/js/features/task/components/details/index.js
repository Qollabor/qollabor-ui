import { connect } from 'react-redux';

import TaskDetailsComponent from './taskDetails';

function mapStateToProps(state) {
  return {
    taskDetails: state.task.get('taskDetails').toJS(),
    isFetching: state.task.get('isFetching'),
    error: state.task.get('error').toJS(),
    loggedInUserId: state.user.get('loggedUser').get('username')
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
    executeTaskAction: (taskId, taskAction, assignee) => {
      dispatch({ type: 'TASK:ITEM:REQUEST_EXECUTE_ACTION', taskId, taskAction, assignee });
    }
  };
}

export const Details = connect(mapStateToProps, mapDispatchToProps)(TaskDetailsComponent);
