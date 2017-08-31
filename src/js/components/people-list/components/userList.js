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

  handleUserSelectChange(uniqueId, event, isInputChecked) {
    if (this.props.onUserSelectChange) {
      this.props.onUserSelectChange(uniqueId, isInputChecked);
    }
  }

  render() {
    const avatarSize = this.props.avatarSize || 40;
    const canSelectUsers = this.props.canSelectUsers || false;
    return (
      <List>
        {this.props.people && this.props.people.length > 0 ?
          this.props.people.map((person) => {
            const { avatarUrl, name, uniqueId, selected } = person;
            const avatarSrc = {};
            let initial = null;
            if (avatarUrl && avatarUrl.length) {
              avatarSrc.src = avatarUrl;
            } else {
              initial = calcInitials(name);
            }

            const actions = {};
            actions.onClick = this.handleOnClick.bind(this, uniqueId);

            return (
              <ListItem
                innerDivStyle={{ paddingTop: 4, paddingLeft: 15, fontSize: 13 }}
                key={uniqueId}
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
  people: React.PropTypes.array,
  canSelectUsers: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onUserSelectChange: React.PropTypes.func,
  avatarSize: React.PropTypes.number
};

export default UserList;
