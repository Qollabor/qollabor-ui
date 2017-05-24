import React from 'react';
import PropTypes from 'prop-types';
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
  params: PropTypes.shape({
    taskId: PropTypes.string
  }),
  location: PropTypes.shape({
    query: PropTypes.shape({
      caseId: PropTypes.string
    })
  })
};

export default TaskPage;
