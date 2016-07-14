import React from 'react';

import { Paper } from 'material-ui';

import UserList from '../../components/people-list/components/userList';
import TextFilter from '../../components/text-filter';

class UserSelector extends React.Component {
  render() {
    const { users } = this.props;
    const hintText = this.props.filterHintText || 'Search to select Users';

    return (
      <div style={{ height: 190 }}>
        <Paper>
          <div style={{ height: 30 }}>
            <TextFilter hintText={hintText}/>
          </div>
          <div style={{ height: 158, overflowY: 'auto', display: 'inline-block', width: '100%' }}>
            <UserList people={users} />
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
