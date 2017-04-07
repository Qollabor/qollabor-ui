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

TaskPage.propTypes = {
  params: React.PropTypes.shape({
    taskId: React.PropTypes.string
  }),
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      caseId: React.PropTypes.string
    })
  })
};

export default TaskPage;
