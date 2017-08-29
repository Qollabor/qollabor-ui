import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';

import UserList from '../people-list/components/userList';
import TextFilter from '../text-filter';

class UserSelector extends React.Component {

  componentWillMount() {
    if (this.props.initUsers) {
      this.props.initUsers();
    }
  }

  handleFilterChange(e, filterValue) {
    if (this.props.setFilter) {
      this.props.setFilter(filterValue);
    }
  }

  handleUserSelectChange(user, selected) {
    if (this.props.onUserSelectChange) {
      this.props.onUserSelectChange(user, selected);
    }
  }

  filterUser(users, filteredUserId) {
    if (filteredUserId && users) {
      const index = users.findIndex(user =>
        user.uniqueId === filteredUserId
      );
      users.splice(index, 1);
    }
  }

  markSelectedUsers(users, selectedUsers) {
    if (selectedUsers && users) {
      users.forEach((user) => {
        const userId = user.uniqueId;
        user.selected = (selectedUsers.findIndex(selectedUser =>
          selectedUser.uniqueId === userId
        ) !== -1);
      });
    }
  }

  render() {
    const { users, selectedUsers, filteredUser } = this.props;
    this.filterUser(users, filteredUser);
    this.markSelectedUsers(users, selectedUsers);

    const hintText = this.props.filterHintText || 'Search to select Users';
    return (
      <div style={{ height: 350 }}>
        <Paper>
          <div style={{ height: 30 }}>
            <TextFilter
              {...this.props}
              hintText={hintText}
              onFilterChange={this.handleFilterChange.bind(this)}
              activeFilter={this.props.filterString}
            />
          </div>
          <div style={{ height: 306, paddingTop: 10, overflowY: 'auto', display: 'inline-block', width: '100%' }}>
            <UserList
              people={users}
              canSelectUsers={true}
              onUserSelectChange={this.handleUserSelectChange.bind(this)}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

UserSelector.propTypes = {
  filterHintText: PropTypes.string,
  filterString: PropTypes.string,
  filteredUser: PropTypes.string,
  initUsers: PropTypes.func,
  onUserSelectChange: PropTypes.func,
  selectedUsers: PropTypes.array,
  setFilter: PropTypes.func,
  users: PropTypes.array
};

export default UserSelector;
