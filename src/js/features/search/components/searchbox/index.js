import SearchBoxComponent from './searchBox';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  initSearch: () => {
    dispatch({ type: 'CAFIENNE:SEARCH:INIT' });
  },
  setFilter: (searchText) => {
    dispatch({ type: 'SEARCH:LIST:INIT', searchText });
  }
});

export default connect(null, mapDispatchToProps)(SearchBoxComponent);
