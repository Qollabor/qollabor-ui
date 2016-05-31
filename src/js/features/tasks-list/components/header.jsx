import React from 'react';

import { ColumnPicker } from 'cafienne-ui-elements';

import styles from './../styles';

export class TaskListHeader extends React.Component {
  render() {
    const actionColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '70px'
    });

    const statusColumnStyle = Object.assign({}, styles.tableHeaderColumn, {
      width: '25px',
      padding: '0 2px'
    });

    return (
      <tr key="headerRow" style={styles.tableHeader}>
        <th key="statusColumn" style={statusColumnStyle}>

        </th>

        {this.props.columns
          .filter((columnDefinition) => columnDefinition.visible)
          .map((columnDefinition) =>
            <th key={columnDefinition.key} style={styles.tableHeaderColumn}>
              {columnDefinition.label}
            </th>
          )}

        <th key="action" style={actionColumnStyle}>
          <ColumnPicker columns={this.props.columns} onMenuItemClicked={this.props.onColumnVisibilityToggle}/>
        </th>
      </tr>
    );
  }
}

TaskListHeader.displayName = 'TaskListHeader';
TaskListHeader.propTypes = {
  columns: React.PropTypes.array.isRequired,
  onColumnVisibilityToggle: React.PropTypes.func.isRequired
};

export default TaskListHeader;
