import UserSelectorComponent from './userSelector';

import { connect } from 'react-redux';

const mapStateToProps = (state) => (state.casemodel.userSelector.toJS());

const mapDispatchToProps = (dispatch) => ({
  initUsers: () => {
    dispatch({ type: 'USERS_SELECTOR:LIST:INIT' });
  },
  setFilter: (filterString) => {
    dispatch({ type: 'USERS_SELECTOR:LIST:FILTER', filterString });
  },
  setFilterUsers: (filterUsers) => {
    dispatch({ type: 'USERS_SELECTOR:LIST:FILTER_USERS', filterUsers });
  }
});

export const UserSelector = connect(mapStateToProps, mapDispatchToProps)(UserSelectorComponent);

