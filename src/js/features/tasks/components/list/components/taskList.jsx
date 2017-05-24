import React from 'react';
import PropTypes from 'prop-types';
import TaskListHeader from './header';
import TaskListRow from './taskRow';
import MessageRow from './messageRow';
import LoaderRow from './loaderRow';

import styles from './../styles';

export class TaskList extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    const bodyHeight = this.props.bodyHeight ? `${this.props.bodyHeight}px` : 'auto';

    const bodyDivStyle = {
      height: bodyHeight,
      overflowX: 'hidden',
      overflowY: 'auto'
    };

    const tbodyStyle = {
      height: bodyHeight
    };

    let tableBody;

    if (this.props.isFetching) {
      tableBody = <LoaderRow colSpan={this.props.columns.length + 2} />;
    } else if (this.props.error && this.props.error.isError) {
      tableBody = <MessageRow colSpan={this.props.columns.length + 2} message={this.props.error.message} />;
    } else {
      tableBody = (this.props.items && this.props.items.length > 0) ?
        this.props.items.map(item =>
          <TaskListRow
            key={item.id}
            rowData={item}
            columns={this.props.columns}
            onRowClick={this.props.onRowClick}
            executeTaskAction={this.props.executeTaskAction}
          />
        ) :
        <MessageRow colSpan={this.props.columns.length + 2} message="No items to show" />;
    }

    return (
      <div>
        <div>
          <table style={styles.table}>
            <thead>
              <TaskListHeader
                columns={this.props.columns}
                onColumnVisibilityToggle={this.props.onColumnVisibilityToggle}
              />
            </thead>
          </table>
        </div>
        <div style={bodyDivStyle}>
          <table style={styles.table}>
            <tbody style={tbodyStyle}>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

TaskList.displayName = 'TaskList';

TaskList.propTypes = {
  columns: PropTypes.array.isRequired,
  items: PropTypes.array,
  onRowClick: PropTypes.func,
  bodyHeight: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onMount: PropTypes.func,
  onColumnVisibilityToggle: PropTypes.func.isRequired,
  executeTaskAction: PropTypes.func
};

export default TaskList;
