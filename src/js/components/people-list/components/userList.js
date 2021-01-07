import PropTypes from 'prop-types';
import React from 'react';
import { List, ListItem, Checkbox } from 'material-ui';
import Avatar from '../../user-avatar';
import { calcInitials } from '../helpers/calcInitials';

class UserList extends React.Component {

  handleOnClick(userId) {
    if (this.props.onClick) {
      this.props.onClick(userId);
    }
  }

  handleUserSelectChange(userId, event, isInputChecked) {
    if (this.props.onUserSelectChange) {
      this.props.onUserSelectChange(userId, isInputChecked);
    }
  }

  render() {
    const avatarSize = this.props.avatarSize || 40;
    const canSelectUsers = this.props.canSelectUsers || false;
    return (
      <List>
        {this.props.people && this.props.people.length > 0 ?
          this.props.people.map((person) => {
            // const { avatarUrl, name, uniqueId, selected } = person;
            const { avatarUrl, name, userId, selected } = person;
            const avatarSrc = {};
            let initial = null;
            if (avatarUrl && avatarUrl.length) {
              avatarSrc.src = avatarUrl;
            } else {
              initial = calcInitials(name);
            }

            const actions = {};
            actions.onClick = this.handleOnClick.bind(this, userId);

            return (
              <ListItem
                innerDivStyle={{ paddingTop: 4, paddingLeft: 15, fontSize: 13 }}
                key={userId}
                {...actions}
                primaryText={<div style={{ marginLeft: 50, paddingTop: 8 }}>{person.name}</div>}
                leftAvatar={<Avatar user={person} size={avatarSize}>{initial}</Avatar>}
                leftCheckbox={
                  canSelectUsers &&
                    <Checkbox
                      style={{ right: 16, left: '' }}
                      checked={selected} onCheck={this.handleUserSelectChange.bind(this, person)}
                    />
                }
              />
            );
          }) : ''}
      </List>
    );
  }
}

UserList.propTypes = {
  people: PropTypes.array,
  canSelectUsers: PropTypes.bool,
  onClick: PropTypes.func,
  onUserSelectChange: PropTypes.func,
  avatarSize: PropTypes.number
};

export default UserList;
