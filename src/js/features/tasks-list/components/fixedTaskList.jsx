import React from 'react';
import Dimensions from 'react-dimensions';
import { ThemeManager } from 'material-ui/lib/styles';
import { loaderColumn, messageColumn, iconColumn, taskColumns, moreOptionsColumn }
  from './taskListColumns';
import { Table } from 'fixed-data-table';

class TaskListFixed extends React.Component {

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  getWidthLength(width) {
    if (this.props.tasks === undefined) return 1000;
    return width;
  }

  getRowCount() {
    if (this.props.tasks === undefined || this.props.tasks.length === 0 || this.props.isFetching) return 1;
    return this.props.tasks.length;
  }

  handleRowClick(id, caseId, onRowClick, event) {
    if (event) {
      event.stopPropagation();
    }

    if (onRowClick) {
      onRowClick(id, caseId);
    }
  }

  render() {
    let tableBody;
    const theme = ThemeManager.getMuiTheme();
    const leftNavWidth = theme.leftNav.width;

    /* this.props.containerWidth is not working correctly after resize,
       therefore, we use currently window.innerWidth. */
    this.tableWidth = this.props.showLeftNav ?
      window.innerWidth - (leftNavWidth + 20) :
      window.innerWidth - 20;

    if (this.props.isFetching) {
      tableBody = (loaderColumn);
    } else if (this.props.error && this.props.error.isError) {
      tableBody = (messageColumn(this.props.error.message));
    } else {
      tableBody = (this.props.tasks && this.props.tasks.length > 0) ?
      ([
        iconColumn(this.props.tasks, this.handleRowClick, this.props.onRowClick),
        taskColumns(this.props.columns, this.props.tasks, this.handleRowClick, this.props.onRowClick),
        moreOptionsColumn(this.props.tasks, this.handleRowClick, this.props.onRowClick)
      ]) : (messageColumn('No items found!'));
    }

    return (
      <Table
        rowHeight={50}
        rowsCount={this.getRowCount()}
        width={this.getWidthLength(this.tableWidth)}
        headerHeight={50}
        height={550}
      >
        {tableBody}
      </Table>
    );
  }
}

TaskListFixed.propTypes = {
  columns: React.PropTypes.array.isRequired,
  tasks: React.PropTypes.array,
  onMount: React.PropTypes.func,
  onRowClick: React.PropTypes.func,
  containerWidth: React.PropTypes.number,
  error: React.PropTypes.object,
  isFetching: React.PropTypes.bool.isRequired,
  showLeftNav: React.PropTypes.bool.isRequired
};

export default Dimensions({ getWidth: element => (element.offsetWidth) })(TaskListFixed);
