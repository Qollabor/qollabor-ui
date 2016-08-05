import CaseList from './caseList';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  initCaseList: () => {
    dispatch({ type: 'CASE:LIST:INIT' });
  },
  getNextSetOfItems: () => {
    dispatch({ type: 'CASE:LIST:NEXT:FETCH' });
  }
});

const mapStateToProps = (state) => state.caseList.toJS();

export default connect(mapStateToProps, mapDispatchToProps)(CaseList);
export * from './sagas';
export { reducers } from './reducers';
