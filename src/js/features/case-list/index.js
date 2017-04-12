import CaseList from './caseList';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  initCaseList: () => {
    dispatch({ type: 'CASE:LIST:INIT' });
  },
  filterData: (filterText) => {
    dispatch({ type: 'CASE:LIST:FILTER_BY_TEXT', filterText });
  },
  onColumnVisibilityToggle: (column) => {
    dispatch({ type: 'CASE:LIST:TOGGLE_COLUMN', columnName: column.key });
  },
  getNextSetOfItems: () => {
    dispatch({ type: 'CASE:LIST:NEXT:FETCH' });
  }
});

const mapStateToProps = state => ({
  isFetching: state.caseList.get('isFetching'),
  definition: state.caseList.get('definition'),
  columns: state.caseList.get('columns').toJS(),
  items: state.caseList.get('items').toJS(),
  sortKey: state.caseList.get('sortKey'),
  sortDesc: state.caseList.get('sortDesc'),
  filterText: state.caseList.get('filterText'),
  error: state.caseList.get('error').toJS(),
  showDrawer: state.app.get('showDrawer')
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseList);
export * from './sagas';
export { reducers } from './reducers';
