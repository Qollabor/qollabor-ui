import { connect } from 'react-redux';

import SubmitTaskConfirmationComponent from './submitTaskConfirmation';

function mapStateToProps(state) {
  return {
    isSuccess: state.task.getIn(['transition', 'success']),
    onGoing: state.task.getIn(['transition', 'onGoing']),
    error: state.task.getIn(['transition', 'error']).toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    transitionToState: (taskId, caseId, taskData, transition) => {
      dispatch({ type: 'TASK:REQUEST_TRANSITION', taskId, caseId, taskData, transition });
    }
  };
}

export const SubmitTaskConfirmation = connect(mapStateToProps, mapDispatchToProps)(SubmitTaskConfirmationComponent);
