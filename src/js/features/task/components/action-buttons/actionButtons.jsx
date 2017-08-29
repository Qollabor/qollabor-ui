import React from 'react';
import PropTypes from 'prop-types';
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
  availableTransitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool.isRequired,
  buttonsDisabled: PropTypes.bool.isRequired,
  caseId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  taskDetails: PropTypes.shape({
    assignee: PropTypes.string,
    caseDefinition: PropTypes.string,
    caseInstanceId: PropTypes.string,
    createdBy: PropTypes.string,
    createdOn: PropTypes.string,
    dueDate: PropTypes.string,
    id: PropTypes.string,
    inputParams: PropTypes.object,
    lastModified: PropTypes.string,
    mappedInput: PropTypes.object,
    modifiedBy: PropTypes.string,
    owner: PropTypes.string,
    parentCaseInstanceId: PropTypes.string,
    planState: PropTypes.string,
    rawOutput: PropTypes.object,
    role: PropTypes.string,
    rootCaseInstanceId: PropTypes.string,
    taskModel: PropTypes.object,
    taskName: PropTypes.string,
    taskState: PropTypes.string,
    taskinputdata: PropTypes.string,
    taskoutputdata: PropTypes.string
  }).isRequired,
  onActionClick: PropTypes.func,
  onTransitionClick: PropTypes.func
};

export default ActionButtons;
