import React from 'react';
import Avatar from '../../user-avatar';
import { List, ListItem, Checkbox } from 'material-ui';
import { calcInitials } from '../helpers/calcInitials';

class UserList extends React.Component {

  handleOnClick(actionUrl) {
    if (this.props.onClick) {
      this.props.onClick(actionUrl);
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
            const { avatarUrl, name, actionUrl, uniqueId, selected } = person;
            const avatarSrc = {};
            let initial = null;
            if (avatarUrl && avatarUrl.length) {
              avatarSrc.src = avatarUrl;
            } else {
              initial = calcInitials(name);
            }

            const actions = {};
            if (actionUrl && actionUrl.length > 0) {
              actions.onClick = this.handleOnClick.bind(this, actionUrl);
            }

            return (
              <ListItem
                innerDivStyle={{ paddingTop: 4, paddingLeft: 15, fontSize: 13 }}
                key={uniqueId}
                {...actions}
                primaryText={<div style={{ marginLeft: 50, paddingTop: 8 }}>{person.name} ({person.uniqueId})</div>}
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
  people: React.PropTypes.array.isRequired,
  canSelectUsers: React.PropTypes.boolean
};

export default UserList;
