import React from 'react';
import { TitledListBox } from '../../../../cafienne-ui-elements';

class ActiveItems extends React.Component {
  render() {
    const TaskListTitle = 'Active tasks';
    return (
      <TitledListBox
        title={TaskListTitle}
        items={this.props.activeTasks}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="taskName"
      />
    );
  }
}

ActiveItems.displayName = 'ActiveItems';

ActiveItems.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  activeTasks: React.PropTypes.array.isRequired,
  error: React.PropTypes.object
};

export default ActiveItems;
