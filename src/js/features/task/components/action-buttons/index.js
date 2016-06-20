import { connect } from 'react-redux';

import { getAvailableActions } from '../../helpers/availableActions';
import { ActionButtons as ActionButtonsComponent } from './actionButtons';

function mapStateToProps(state) {
  return {
    availableActions: getAvailableActions(state.task.get('taskDetails').toJS())
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (taskId, taskAction) => {
      dispatch({ type: 'TASK:ITEM:REQUEST_EXECUTE_ACTION', taskId, taskAction });
    }
  };
}

export const ActionButtons =
  connect(mapStateToProps, mapDispatchToProps)(ActionButtonsComponent);
