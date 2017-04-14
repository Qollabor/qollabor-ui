import { connect } from 'react-redux';
import List from './list';

const mapDispatchToProps = dispatch => ({
  filterData: (filterString) => {
    dispatch({ type: 'CASEMODEL:LIST:FILTER_BY_TEXT', filterString });
  }
});

const mapStateToProps = state => ({
  isFetching: state.casemodel.list.get('isFetching'),
  filterString: state.casemodel.list.get('filterString'),
  items: state.casemodel.list.get('items'),
  error: state.casemodel.list.get('error').toJS()
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
