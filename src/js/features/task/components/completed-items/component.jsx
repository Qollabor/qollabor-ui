import React from 'react';
import PropTypes from 'prop-types';
import { TitledListBox } from '../../../../qollabor-ui-elements';

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
  isFetching: PropTypes.bool.isRequired,
  completedTasks: PropTypes.array.isRequired,
  error: PropTypes.object
};

export default CompletedItems;
