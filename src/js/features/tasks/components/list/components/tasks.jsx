import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import registry from 'app-registry';

import { ActionAssignmentReturned, ActionAssignmentInd, ActionAssignmentReturn } from 'material-ui/svg-icons';

import {
  ResponsiveTableWrapper,
  DataCell,
  DateCell,
  SortHeaderCell,
  Column
} from '../../../../../cafienne-ui-elements';

import { ActionChooserCell } from './cells';

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

export class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
    this.isActionDisabled = this.isActionDisabled.bind(this);
    this.handleTaskActions = this.handleTaskActions.bind(this);
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  handleRowClick(e, index) {
    if (event) {
      event.stopPropagation();
    }

    if (this.props.onTaskRowClick) {
      const { id, caseInstanceId } = this.props.items[index];
      this.props.onTaskRowClick(id, caseInstanceId);
    }
  }

  handleScrollEnd() {
    if (this.props.getNextSetOftasks) {
      this.props.getNextSetOftasks();
    }
  }

  handleTaskActions(actionItem, user, index) {
    const action = actionItem.action;
    const taskId = this.props.items[index].id;
    this.props.executeTaskAction(taskId, action, user);
  }

  isActionDisabled(actionItem, index) {
    const taskAction = actionItem.action;
    const store = registry.get('store');
    const loggedInUserId = store.getState().user.getIn(['loggedUser', 'username']);

    const { assignee, taskState } = this.props.items[index];
    if (taskState === 'Unassigned' && (taskAction === 'claim' || taskAction === 'assign')) {
      return false;
    } else if (
      taskState === 'Assigned' &&
      assignee === loggedInUserId &&
      (taskAction === 'revoke' || taskAction === 'delegate')
    ) {
      return false;
    }

    return true;
  }

  render() {
    const { items, isFetching, error } = this.props;
    const theme = registry.get('theme');

    // Resize table width with app drawer resize
    const drawerWidth = this.props.showDrawer
      ? (theme.rightDrawer && theme.rightDrawer.width) || theme.drawer.width
      : 10;
    const tableWidth = window.innerWidth - (drawerWidth - 5);
    const tableHeight = window.innerHeight - (theme.appBar.height + 8);

    let message;
    if (error && error.isError) {
      message = (
        <div style={{ position: 'absolute', top: 150, margin: 'auto', left: 400 }}>
          {error.message}
        </div>
      );
    } else if (!isFetching && items.length === 0) {
      message = <div style={{ position: 'absolute', top: 150, margin: 'auto', left: 400 }}>No items found ...</div>;
    }

    return (
      <Paper style={{ position: 'absolute', bottom: 30, top: 50, width: tableWidth, height: tableHeight }}>
        <div style={{ marginLeft: '20px' }}>
          {message}

          <ResponsiveTableWrapper
            rowHeight={45}
            headerHeight={50}
            containerWidth={tableWidth + 30}
            containerHeight={tableHeight - 10}
            showColumnChooser={true}
            showStatusIcon={true}
            rowsCount={items.length}
            onRowClick={this.handleRowClick}
            onScrollEnd={this.handleScrollEnd}
            {...this.props}
          >
            <Column
              columnKey="taskName"
              header={<SortHeaderCell {...this.props}> Task name </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={50}
            />
            <Column
              columnKey="caseDefinition"
              header={<SortHeaderCell {...this.props}> Case </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={50}
            />
            <Column
              columnKey="caseInstanceId"
              header={<SortHeaderCell {...this.props}> Case ID </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={120}
            />
            <Column
              columnKey="dueDate"
              header={<SortHeaderCell {...this.props}> Time Remaining </SortHeaderCell>}
              cell={<DateCell items={items} type="timeRem" />}
              flexGrow={1}
              width={40}
            />
            <Column
              columnKey="createdOn"
              header={<SortHeaderCell {...this.props}>Creation date </SortHeaderCell>}
              cell={<DateCell items={items} type="timeAgo" dateFormat="YYYY-MM-DD HH:mm:ss" />}
              flexGrow={1}
              width={50}
            />
            <Column
              cell={
                <ActionChooserCell
                  actionItems={actionItems}
                  isDisabled={this.isActionDisabled}
                  onActionHandler={this.handleTaskActions}
                />
              }
              width={50}
            />
          </ResponsiveTableWrapper>
        </div>
      </Paper>
    );
  }
}

TaskList.displayName = 'TaskList';

TaskList.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.shape({
    message: PropTypes.string,
    isError: PropTypes.bool
  }),
  onRowClick: PropTypes.func,
  bodyHeight: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
  onMount: PropTypes.func,
  onColumnVisibilityToggle: PropTypes.func.isRequired,
  showDrawer: PropTypes.bool,
  onTaskRowClick: PropTypes.func,
  getNextSetOftasks: PropTypes.func,
  executeTaskAction: PropTypes.func
};

TaskList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default TaskList;
