import React from 'react';
import { Task } from '../features/task';

class TaskPage extends React.Component {
  render() {
    return (
      <div>
        <Task taskId={this.props.params.taskId} caseId={this.props.location.query.caseId} />
      </div>
    );
  }
}

export default TaskPage;
