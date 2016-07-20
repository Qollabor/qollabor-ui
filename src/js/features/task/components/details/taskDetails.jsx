import React from 'react';
import { RaisedButton } from 'material-ui';
import TaskInfo from '../info';
import { TaskBreadcrumb } from '../breadcrumb';
import TaskModelSchemaForm from '../schema-form';
import { ActionButtons } from '../../components/action-buttons';
import { TransitionButtons } from '../../components/transition-buttons';


export class TaskDetails extends React.Component {

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.taskId);
    }
  }

  handleOnSubmit(taskData) {
    if (this.currentFormAction === 'complete' && this.props.transitionToState) {
      this.props.transitionToState(this.props.taskId, this.props.caseId, taskData.formData, this.currentFormAction);
    } else if (this.currentFormAction === 'save' && this.props.saveTaskDetails) {
      this.props.saveTaskDetails(this.props.taskId, taskData.formData);
    }
  }

  handleButtonClick(formAction) {
    this.currentFormAction = formAction;
  }

  render() {
    const taskDetails = this.props.taskDetails;

    const taskModel = taskDetails.taskModel || {};
    const taskSchema = taskModel.schema || {};
    const taskUISchema = taskModel.uiSchema || {};
    const formData = (taskDetails.rawOutput && Object.keys(taskDetails.rawOutput).length !== 0)
      ? taskDetails.rawOutput : taskDetails.mappedInput;
    const isPlanItemDisabled = (taskDetails.planState === 'Completed') || (taskDetails.planState === 'Terminated');
    const disableForm = (taskDetails.taskState === 'Unassigned') || isPlanItemDisabled;
    const isSuspended = (taskDetails.planState === 'Suspended');

    const buttonStyle = {
      margin: '3px'
    };

    const buttonList = [<div>
      <span>
        <RaisedButton
          label="COMPLETE" backgroundColor={'olive'} labelColor="white" disabled={disableForm || isSuspended}
          type="submit" style={buttonStyle} onTouchTap={this.handleButtonClick.bind(this, 'complete')}
        />
        <RaisedButton
          label="SAVE" primary={true} type="submit" disabled={disableForm || isSuspended}
          style={buttonStyle} onTouchTap={this.handleButtonClick.bind(this, 'save')}
        />
        <RaisedButton
          label="RESET" primary={false} secondary={true}
          style={buttonStyle} disabled={disableForm || isSuspended}
        />
      </span>
      <span style={{ position: 'absolute', right: 30 }}>
        <TransitionButtons taskId={this.props.taskId} caseId={this.props.caseId} disabled={disableForm}/>
      </span>
    </div>];


    return (
      <div>
        <TaskBreadcrumb />
        <span style={{ float: 'right' }}>
          <ActionButtons taskId={this.props.taskId} caseId={this.props.caseId} disabled={isSuspended}/>
        </span>
        <TaskInfo
          taskDetails={taskDetails}
          isFetching={this.props.isFetching}
          error={this.props.error}
        />
        <TaskModelSchemaForm
          schema={taskSchema}
          uiSchema={taskUISchema}
          formData={formData}
          buttonList={buttonList}
          disabled={disableForm || isSuspended}
          onSubmit={this.handleOnSubmit.bind(this)}
        />
      </div>
    );
  }
}

TaskDetails.propTypes = {
  taskId: React.PropTypes.string.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  taskDetails: React.PropTypes.object.isRequired
};

TaskDetails.displayName = 'TaskDetails';

export default TaskDetails;
