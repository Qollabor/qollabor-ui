import React from 'react';

import ActionChooser from '../action-chooser';
import { ActionAssignmentInd } from 'material-ui/svg-icons';

const actionItems = [
  {
    action: 'assign',
    primaryText: 'Assign',
    leftIcon: <ActionAssignmentInd />,
    transition: false
  }
];

export class ActionButtons extends React.Component {

  onActionHandler(actionItem, user) {
    const taskId = this.props.taskId;
    if (actionItem.transition === true) {
      const caseId = this.props.caseId;
      this.props.onTransitionClick(taskId, caseId, actionItem.action);
    } else {
      this.props.onActionClick(taskId, actionItem.action, user);
    }
  }

  handleButtonClick(action, user) {
    const taskId = this.props.taskId;
    this.props.onActionClick(taskId, action, user);
  }

  isActionDisabled(actionItem) {
    const taskAction = actionItem.action;
    const { taskState, planState } = this.props.taskDetails;

    switch (taskState) {
      case 'Assigned' : {
        switch (planState) {
          case 'Suspended' : {
            if (taskAction === 'resume') return false;
            break;
          }
          default : {
            if (actionItem.transition === true && !this.props.buttonsDisabled) return false;
            break;
          }
        }
        break;
      }
      case 'Unassigned' : {
        if (taskAction === 'assign') return false;
        break;
      }
      default : return true;
    }

    return true;
  }

  render() {
    const items = actionItems.concat(this.props.availableTransitions ? this.props.availableTransitions : []);
    const content = (
      <ActionChooser
        iconStyle={{ height: 21, padding: 0 }}
        actionItems={items} onActionHandler={this.onActionHandler.bind(this)}
        isDisabled={this.isActionDisabled.bind(this)}
      />
    );

    return content;
  }
}

ActionButtons.propTypes = {
  availableActions: React.PropTypes.array.isRequired,
  taskId: React.PropTypes.string.isRequired,
  onActionClick: React.PropTypes.func,
  onTransitionClick: React.PropTypes.func
};

export default ActionButtons;
