import React from 'react';

import { IconButton, FontIcon } from 'material-ui';

import styles from './../styles';

class TaskRow extends React.Component {
  handleRowClick(id, caseId, event) {
    if (event) {
      event.stopPropagation();
    }

    if (this.props.onRowClick) {
      this.props.onRowClick(id, caseId);
    }
  }

  render() {
    const actionColumnStyle = Object.assign({}, styles.tableRowColumn, {
      width: '70px'
    });

    const statusColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '25px',
      padding: '3px 2px 0 6px'
    });

    return (
      <tr
        style={styles.tableRow}
        key={this.props.rowData.id}
        onClick={this.handleRowClick.bind(this, this.props.rowData.id, this.props.rowData.caseInstanceId)}
      >
        <td key="statusColumn" style={statusColumnStyle}>
          <FontIcon
            className="material-icons"
            style={this.props.rowData.viewInternalData.iconStyle}
          >{this.props.rowData.viewInternalData.icon}</FontIcon>
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
