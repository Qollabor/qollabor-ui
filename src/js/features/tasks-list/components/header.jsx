import React from 'react';

import { IconButton, FontIcon } from 'material-ui';

import styles from './../styles';

export class TaskListHeader extends React.Component {
  render() {
    const actionColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '70px'
    });

    const statusColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '50px'
    });

    return (
      <tr key="headerRow" style={styles.tableHeader}>
        <th key="statusColumn" style={statusColumnStyle}>

        </th>

        {this.props.columns.map((columnDefinition) =>
          <th key={columnDefinition.key} style={styles.tableHeaderColumn}>
            {columnDefinition.label}
          </th>
        )}

        <th key="action" style={actionColumnStyle}>
          <IconButton>
            <FontIcon className="material-icons">settings</FontIcon>
          </IconButton>
        </th>
      </tr>
    );
  }
}

TaskListHeader.displayName = 'TaskListHeader';
TaskListHeader.propTypes = {
  columns: React.PropTypes.array.isRequired
};

export default TaskListHeader;
