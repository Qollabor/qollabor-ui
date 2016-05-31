import React from 'react';
import TaskInfo from '../info';
import { TaskBreadcrumb } from '../breadcrumb';

export class TaskDetails extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.taskId);
    }
  }

  render() {
    return (
      <div>
        <TaskBreadcrumb />
        <div style={{ height: '400px' }}></div>
        <TaskInfo
          taskDetails={this.props.taskDetails}
          isFetching={this.props.isFetching}
          error={this.props.error}
          title={'Task information'}
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
