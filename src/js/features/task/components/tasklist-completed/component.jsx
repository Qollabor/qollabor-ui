import React from 'react';
import { TaskList } from '../tasklist';

class TaskListCompleted extends React.Component {

  render() {
    const TaskListTitle = 'Completed tasks';
    let bodyContent = null;

    if (this.props.isFetching) {
      bodyContent = 'Show <TaskListCompletedLoader/>';
    } else if (this.props.error && this.props.error.isError) {
      bodyContent = `Show <TaskListCompletedError/> with msg:${this.props.error.message}`;
    } else {
      bodyContent = (
        <TaskList
          title={TaskListTitle}
          taskList={this.props.completedTasks}
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

TaskListCompleted.displayName = 'TaskListCompleted';

TaskListCompleted.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  completedTasks: React.PropTypes.array.isRequired,
  error: React.PropTypes.object
};

export default TaskListCompleted;
