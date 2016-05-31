import React from 'react';
import { TitledListBox } from 'cafienne-ui-elements';

class CompletedItems extends React.Component {
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

CompletedItems.displayName = 'CompletedItems';

CompletedItems.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  completedTasks: React.PropTypes.array.isRequired,
  error: React.PropTypes.object
};

export default CompletedItems;
