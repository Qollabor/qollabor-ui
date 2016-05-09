import React from 'react';

export class TaskDetails extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.taskId);
    }
  }

  render() {
    let bodyContent = null;
    if (this.props.isFetching) {
      bodyContent = 'Show <TaskDetailsLoader/>';
    } else if (this.props.error && this.props.error.isError) {
      bodyContent = `Show <ErrorMessage/> with msg:${this.props.error.message}`;
    } else {
      bodyContent =
        <pre>{JSON.stringify(this.props.taskDetails, null, 4)}</pre>;
    }

    return (
      <div>
        {bodyContent}
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
