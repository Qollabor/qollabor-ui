import { connect } from 'react-redux';

import { getAvailableActions } from '../../helpers/availableActions';
import { getAvailableTransitions } from '../../helpers/availableTransitions';
import { ActionButtons as ActionButtonsComponent } from './actionButtons';

function mapStateToProps(state) {
  return {
    buttonsDisabled: state.task.getIn(['transition', 'onGoing']),
    availableActions: getAvailableActions(state.task.get('taskDetails').toJS()),
    availableTransitions: getAvailableTransitions(state.task.get('taskDetails').toJS()),
    taskDetails: state.task.get('taskDetails').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onActionClick: (taskId, taskAction, assignee) => {
      dispatch({ type: 'TASK:ITEM:REQUEST_EXECUTE_ACTION', taskId, taskAction, assignee });
    },
    onTransitionClick: (taskId, caseId, transition) => {
      dispatch({ type: 'TASK:REQUEST_TRANSITION', taskId, caseId, transition });
    }
  };
}

export const ActionButtons =
  connect(mapStateToProps, mapDispatchToProps)(ActionButtonsComponent);
