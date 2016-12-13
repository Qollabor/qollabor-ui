import SearchResult from './searchResult';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  initSearchResult: () => {
    dispatch({ type: 'SEARCH:LIST:INIT' });
  },
  getNextSetOfItems: () => {
    dispatch({ type: 'SEARCH:LIST:NEXT:FETCH' });
  }
});

const mapStateToProps = (state) => state.searchResult.toJS();

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
export * from './sagas';
export { reducers } from './reducers';
