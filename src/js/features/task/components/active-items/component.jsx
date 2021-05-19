import React from 'react';
import PropTypes from 'prop-types';
import { TitledListBox } from '../../../../qollabor-ui-elements';

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
  isFetching: PropTypes.bool.isRequired,
  activeTasks: PropTypes.array.isRequired,
  error: PropTypes.object
};

export default ActiveItems;
