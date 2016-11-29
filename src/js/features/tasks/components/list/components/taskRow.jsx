import React from 'react';

import { FontIcon } from 'material-ui';
import ActionChooser from '../../../../task/components/action-chooser';
import registry from 'app-registry';
import { ActionAssignmentReturned, ActionAssignmentInd, ActionAssignmentReturn } from 'material-ui/svg-icons';

import styles from './../styles';

const actionItems = [
  {
    action: 'claim',
    primaryText: 'Claim',
    leftIcon: <ActionAssignmentReturned />
  },
  {
    action: 'assign',
    primaryText: 'Assign',
    leftIcon: <ActionAssignmentInd />
  },
  {
    action: 'revoke',
    primaryText: 'Revoke',
    leftIcon: <ActionAssignmentReturn />
  },
  {
    action: 'delegate',
    primaryText: 'Delegate',
    leftIcon: <ActionAssignmentInd />
  }
];

class TaskRow extends React.Component {
  handleRowClick(id, caseId, event) {
    if (event) {
      event.stopPropagation();
    }

    if (this.props.onRowClick) {
      this.props.onRowClick(id, caseId);
    }
  }

  handleTaskActions(actionItem, user) {
    const taskId = this.props.rowData.id;
    this.props.executeTaskAction(taskId, actionItem.action, user);
  }

  isActionDisabled(taskActionItem) {
    const taskAction = taskActionItem.action;
    const store = registry.get('store');
    const loggedInUserId = store.getState().user.getIn(['loggedUser', 'username']);

    const { assignee, taskState } = this.props.rowData;
    if ((taskState === 'Unassigned') && (taskAction === 'claim' || taskAction === 'assign')) {
      return false;
    } else if (taskState === 'Assigned' && assignee === loggedInUserId
        && (taskAction === 'revoke' || taskAction === 'delegate')) {
      return false;
    }

    return true;
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
            ((columnDefinition.key === 'dueDate' || columnDefinition.key === 'createdOn') ? (<td
              style={styles.tableRowColumn}
              key={columnDefinition.key}
              title={this.props.rowData[columnDefinition.key].title}
            >{this.props.rowData[columnDefinition.key].value}</td>) :
            (<td
              style={styles.tableRowColumn}
              key={columnDefinition.key}
            >{this.props.rowData[columnDefinition.key]}</td>))
          )}
        <td
          key="action"
          style={actionColumnStyle}
        >
          <ActionChooser
            actionItems={actionItems} onActionHandler={this.handleTaskActions.bind(this)}
            isDisabled={this.isActionDisabled.bind(this)}
          />
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
