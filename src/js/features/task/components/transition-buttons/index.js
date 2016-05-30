import { connect } from 'react-redux';

import { getAvailableTransitions } from '../../helpers/availableTransitions';
import { TransitionButtons as TransitionButtonsComponent } from './transition-buttons';

function mapStateToProps(state) {
  return {
    buttonsDisabled: state.task.getIn(['transition', 'onGoing']),
    availableTransitions: getAvailableTransitions(state.task.get('taskDetails').toJS())
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (taskId, caseId, transition) => {
      dispatch({ type: 'TASK:REQUEST_TRANSITION', taskId, caseId, transition });
    }
  };
}

export const TransitionButtons =
  connect(mapStateToProps, mapDispatchToProps)(TransitionButtonsComponent);
