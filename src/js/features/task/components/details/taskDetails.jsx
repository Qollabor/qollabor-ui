import React from 'react';
import { RaisedButton, FlatButton } from 'material-ui';
import TaskInfo from '../info';
import { TaskBreadcrumb } from '../breadcrumb';
import TaskModelSchemaForm from '../schema-form';
import { ActionButtons } from '../../components/action-buttons';
import { StatusCapsule } from '../../../../components/capsules';

export class TaskDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.taskId);
    }
  }

  handleOnSubmit(taskData) {
    if (this.currentFormAction === 'complete' && this.props.transitionToState) {
      this.props.transitionToState(
        this.props.taskId,
        this.props.caseId,
        taskData.formData,
        this.currentFormAction
      );
    } else if (this.currentFormAction === 'save' && this.props.saveTaskDetails) {
      this.props.saveTaskDetails(this.props.taskId, taskData.formData);
    }
  }

  handleButtonClick(formAction) {
    this.currentFormAction = formAction;
  }

  render() {
    const taskDetails = this.props.taskDetails;
    const status = (taskDetails.planState === 'Active' ? taskDetails.taskState : taskDetails.planState);
    const taskModel = taskDetails.taskModel || {};
    const taskSchema = taskModel.schema || {};
    const taskUISchema = taskModel.uiSchema || {};
    const formData = (taskDetails.rawOutput && Object.keys(taskDetails.rawOutput).length !== 0)
      ? taskDetails.rawOutput : taskDetails.mappedInput;
    const isPlanItemDisabled = (taskDetails.planState === 'Completed') || (taskDetails.planState === 'Terminated');
    const notAssignedToCurrentUser = (this.props.loggedInUserId !== taskDetails.assignee && taskDetails.assignee !== null);
    const isSuspended = (taskDetails.planState === 'Suspended');
    const disableForm = (taskDetails.taskState === 'Unassigned') ||
                        notAssignedToCurrentUser ||
                        isSuspended ||
                        isPlanItemDisabled;
    const buttonStyle = {
      margin: '3px'
    };

    const buttonList = [<RaisedButton
      label="COMPLETE" primary={true} key="complete" type="submit" disabled={disableForm}
      style={buttonStyle} onTouchTap={this.handleButtonClick.bind(this, 'complete')}
    />,
      <FlatButton
        label="SAVE FOR LATER" key="save" type="submit" disabled={disableForm}
        style={buttonStyle} onTouchTap={this.handleButtonClick.bind(this, 'save')}
      />];


    return (
      <div>
        <div style={{ float: 'right' }}>
          <ActionButtons
            taskId={this.props.taskId}
            caseId={this.props.caseId}
            disabled={notAssignedToCurrentUser}
          />
        </div>
        <div style={{ float: 'right' }}>
          <StatusCapsule status={status}>{status}</StatusCapsule>
        </div>
        <TaskBreadcrumb />
        <TaskInfo
          taskDetails={taskDetails}
          isFetching={this.props.isFetching}
          error={this.props.error}
          loggedInUserId={this.props.loggedInUserId}
          executeTaskAction={this.props.executeTaskAction}
        />
        <TaskModelSchemaForm
          schema={taskSchema}
          uiSchema={taskUISchema}
          formData={formData}
          buttonList={buttonList}
          disabled={disableForm}
          onSubmit={this.handleOnSubmit}
          taskDetails={taskDetails}
          executeTaskAction={this.props.executeTaskAction}
        />
      </div>
    );
  }
}

TaskDetails.propTypes = {
  caseId: React.PropTypes.string,
  error: React.PropTypes.shape({
    isError: React.PropTypes.bool,
    message: React.PropTypes.string
  }),
  executeTaskAction: React.PropTypes.func,
  taskId: React.PropTypes.string.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  loggedInUserId: React.PropTypes.string.isRequired,
  onMount: React.PropTypes.func,
  saveTaskDetails: React.PropTypes.func,
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
  transitionToState: React.PropTypes.func
};

TaskDetails.displayName = 'TaskDetails';

export default TaskDetails;
