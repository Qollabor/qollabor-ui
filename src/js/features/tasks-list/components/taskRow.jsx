import React from 'react';

import { IconButton, FontIcon } from 'material-ui';

import { TaskStatus } from './taskStatus';

import styles from './../styles';

class TaskRow extends React.Component {
  handleRowClick(id, event) {
    if (event) {
      event.stopPropagation();
    }

    if (this.props.onRowClick) {
      this.props.onRowClick(id);
    }
  }

  render() {
    const actionColumnStyle = Object.assign({}, styles.tableRowColumn, {
      width: '70px'
    });

    const statusColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '50px'
    });

    return (
      <tr
        style={styles.tableRow}
        key={this.props.rowData.id}
        onClick={this.handleRowClick.bind(this, this.props.rowData.id)}
      >
        <td key="statusColumn" style={statusColumnStyle}>
          <TaskStatus status={this.props.rowData.status}/>
        </td>

        {this.props.columns
          .filter((columnDefinition) => columnDefinition.visible)
          .map((columnDefinition) =>
            <td
              style={styles.tableRowColumn}
              key={columnDefinition.key}
            >{this.props.rowData[columnDefinition.key]}</td>
          )}

        <td
          key="action"
          style={actionColumnStyle}
        >
          <IconButton>
            <FontIcon className="material-icons">more_vert</FontIcon>
          </IconButton>
        </td>
      </tr>
    );
  }
}

TaskRow.displayName = 'TaskRow';

TaskRow.propTypes = {
  columns: React.PropTypes.array.isRequired,
  rowData: React.PropTypes.object.isRequired,
  onRowClick: React.PropTypes.func
};

export default TaskRow;
