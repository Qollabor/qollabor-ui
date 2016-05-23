import React from 'react';
import { TitledListBox } from '../../../../components/titled-list-box';

class TaskListCompleted extends React.Component {

  render() {
    const TaskListTitle = 'Completed tasks';

    return (
      <TitledListBox
        title={TaskListTitle}
        items={this.props.completedTasks}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="taskName"
      />
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
