import React from 'react';

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

  markSelectedUsers(users, selectedUsers) {
    if (selectedUsers && users) {
      users.forEach((user) => {
        const userId = user.uniqueId;
        user.selected = selectedUsers.find((selectedUser) =>
          selectedUser.uniqueId === userId
        );
      });
    }
  }

  render() {
    const { users, selectedUsers } = this.props;
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
          <div style={{ height: 288, overflowY: 'auto', display: 'inline-block', width: '100%' }}>
            <UserList people={users} canSelectUsers={true} onUserSelectChange={this.handleUserSelectChange.bind(this)}/>
          </div>
        </Paper>
      </div>
    );
  }
}

UserSelector.propTypes = {
  filterHintText: React.PropTypes.string,
  filterUsers: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default UserSelector;
