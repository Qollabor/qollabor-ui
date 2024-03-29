import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import registry from 'app-registry';
import {
  ResponsiveTableWrapper,
  DataCell,
  DateCell,
  sortData,
  SortHeaderCell,
  Column
} from '../../cafienne-ui-elements';
import TextFilter from '../../components/text-filter';

class CaseList extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterStringChange = this.handleFilterStringChange.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);
  }
  componentWillMount () {
    if (this.props.initCaseList) {
      this.props.initCaseList();
    }
  }

  handleRowClick (e, index) {
    const caseId = this.props.items[index].id;
    this.context.router.push(`/cases/${caseId}`);
  }

  handleFilterStringChange (e, filterValue) {
    e.preventDefault();
    this.props.filterData(filterValue);
  }

  handleScrollEnd () {
    if (this.props.getNextSetOfItems) {
      this.props.getNextSetOfItems();
    }
  }

  render () {
    const { isFetching, filterText } = this.props;
    const items = sortData(this.props.items, this.props.sortKey, this.props.sortDesc);
    const theme = registry.get('theme');

    // Resize table width with app drawer resize
    const drawerWidth = this.props.showDrawer ?
      ((theme.rightDrawer && theme.rightDrawer.width) || theme.drawer.width) : 10;
    const tableWidth = window.innerWidth - (drawerWidth - 5);
    const tableHeight = window.innerHeight - (theme.appBar.height + 8);

    return (
      <Paper style={{ position: 'absolute', bottom: 30, top: 50, width: tableWidth, height: tableHeight }}>
        <TextFilter
          searchIconStyle={{ color: 'gray' }}
          {...this.props} activeFilter={filterText}
          onFilterChange={this.handleFilterStringChange}
        />
        <div style={{ marginLeft: '20px' }}>
          {!isFetching && items.length === 0 &&
            <div style={{ position: 'absolute', top: 150, margin: 'auto', left: 400 }}>No items found ...</div>}

          <ResponsiveTableWrapper
            rowHeight={45}
            showColumnChooser={true}
            headerHeight={40}
            containerWidth={tableWidth}
            containerHeight={tableHeight - 60}
            rowsCount={items.length} onRowClick={this.handleRowClick}
            onScrollEnd={this.handleScrollEnd}
            {...this.props}
          >
            <Column
              columnKey="caseInstanceId"
              header={<SortHeaderCell {...this.props}> ID </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={2}
              width={250}
            />
            <Column
              columnKey="definition"
              header={<SortHeaderCell {...this.props}> Name </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={50}
            />
            <Column
              columnKey="currentState"
              header={<SortHeaderCell {...this.props}> Status </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={50}
            />
            <Column
              columnKey="currentMileStone"
              header={<SortHeaderCell {...this.props}> Milestone </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={70}
            />
            <Column
              columnKey="parentCaseId"
              header={<SortHeaderCell {...this.props}> Parent </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={80}
            />
            <Column
              columnKey="lastModifiedBy"
              header={<SortHeaderCell {...this.props}> Modified By </SortHeaderCell>}
              cell={<DataCell items={items} />}
              flexGrow={1}
              width={50}
            />
            <Column
              columnKey="lastModified"
              header={<SortHeaderCell {...this.props}> Modified At </SortHeaderCell>}
              cell={<DateCell items={items} />}
              flexGrow={1}
              width={100}
            />
          </ResponsiveTableWrapper>
        </div>
      </Paper>
    );
  }
}

CaseList.propTypes = {
  caseId: PropTypes.string,
  filterData: PropTypes.func,
  filterText: PropTypes.string,
  getNextSetOfItems: PropTypes.func,
  initCaseList: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  showDrawer: PropTypes.bool,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.string
};

CaseList.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CaseList;
