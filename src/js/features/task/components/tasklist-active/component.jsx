import React from 'react';
import { TaskList } from '../tasklist';

class TaskListActive extends React.Component {

  render() {
    const TaskListTitle = 'Active tasks';
    let bodyContent = null;

    if (this.props.isFetching) {
      bodyContent = 'Show <TaskListActiveLoader/>';
    } else if (this.props.error && this.props.error.isError) {
      bodyContent = `Show <TaskListActiveError/> with msg:${this.props.error.message}`;
    } else {
      bodyContent = (
        <TaskList
          title={TaskListTitle}
          taskList={this.props.activeTasks}
        />
      );
    }

    return (
      <div>
        {bodyContent}
      </div>
    );
  }
}

TaskListActive.displayName = 'TaskListActive';

TaskListActive.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  activeTasks: React.PropTypes.array.isRequired,
  error: React.PropTypes.object
};

export default TaskListActive;
