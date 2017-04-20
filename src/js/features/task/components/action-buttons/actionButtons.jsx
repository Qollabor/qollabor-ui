import React from 'react';
import { ActionAssignmentInd } from 'material-ui/svg-icons';
import ActionChooser from '../action-chooser';

const actionItems = [
  {
    action: 'assign',
    primaryText: 'Assign',
    leftIcon: <ActionAssignmentInd />,
    transition: false
  }
];

export class ActionButtons extends React.Component {
  constructor(props) {
    super(props);

    this.onActionHandler = this.onActionHandler.bind(this);
    this.isActionDisabled = this.isActionDisabled.bind(this);
  }

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

    if (this.props.disabled) return true;

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
        actionItems={items} onActionHandler={this.onActionHandler}
        isDisabled={this.isActionDisabled}
      />
    );

    return content;
  }
}

ActionButtons.propTypes = {
  availableTransitions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  disabled: React.PropTypes.bool.isRequired,
  buttonsDisabled: React.PropTypes.bool.isRequired,
  caseId: React.PropTypes.string.isRequired,
  taskId: React.PropTypes.string.isRequired,
  taskDetails: React.PropTypes.shape({
    assignee: React.PropTypes.string,
    caseDefinition: React.PropTypes.string,
    caseInstanceId: React.PropTypes.string,
    createdBy: React.PropTypes.string,
    createdOn: React.PropTypes.string,
    dueDate: React.PropTypes.string,
    id: React.PropTypes.string,
    inputParams: React.PropTypes.object,
    lastModified: React.PropTypes.string,
    mappedInput: React.PropTypes.object,
    modifiedBy: React.PropTypes.string,
    owner: React.PropTypes.string,
    parentCaseInstanceId: React.PropTypes.string,
    planState: React.PropTypes.string,
    rawOutput: React.PropTypes.object,
    role: React.PropTypes.string,
    rootCaseInstanceId: React.PropTypes.string,
    taskModel: React.PropTypes.object,
    taskName: React.PropTypes.string,
    taskState: React.PropTypes.string,
    taskinputdata: React.PropTypes.string,
    taskoutputdata: React.PropTypes.string
  }).isRequired,
  onActionClick: React.PropTypes.func,
  onTransitionClick: React.PropTypes.func
};

export default ActionButtons;
