import React from 'react';

import { RaisedButton } from 'material-ui';
import ActionChooser from '../action-chooser';
import { store } from '../../../../store.js';
import { ActionAssignmentInd } from 'material-ui/svg-icons';

const buttonStyle = {
  margin: '3px'
};

const actionItems = [
  {
    action: 'assign',
    primaryText: 'Assign',
    leftIcon: <ActionAssignmentInd/>,
    transition: false
  },
  {
    action: 'delegate',
    primaryText: 'Delegate',
    leftIcon: <ActionAssignmentInd/>,
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

  isActionDisabled(taskActionItem) {
    const taskAction = taskActionItem.action;
    const loggedInUserId = store.getState().user.getIn(['loggedUser', 'username']);

    const { assignee, taskState } = this.props.taskDetails;
    if ((taskState === 'Unassigned') && taskAction === 'assign') {
      return false;
    } else if (taskState === 'Assigned' && assignee === loggedInUserId
        && (taskAction === 'delegate' || (taskActionItem.transition === true && !this.props.buttonsDisabled))) {
      return false;
    }
    return true;
  }

  render() {
    const items = actionItems.concat(this.props.availableTransitions ? this.props.availableTransitions : []);
    const content = (
      <div>
        <div>
          {this.props.availableActions.map((taskAction) => (
            <RaisedButton
              style={buttonStyle}
              backgroundColor={taskAction.backgroundColor}
              labelColor="white"
              key={taskAction.action}
              label={taskAction.label}
              disabled={taskAction.disabled || this.props.disabled}
              onTouchTap={this.handleButtonClick.bind(this, taskAction.action)}
            />
          ))}
          <ActionChooser
            actionItems={items} onActionHandler={this.onActionHandler.bind(this)}
            isDisabled={this.isActionDisabled.bind(this)}
          />
        </div>
      </div>
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
