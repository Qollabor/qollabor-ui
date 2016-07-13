import React from 'react';
import Avatar from '../../user-avatar';
import { List, ListItem } from 'material-ui';
import { calcInitials } from '../helpers/calcInitials';

class UserList extends React.Component {

  handleOnClick(actionUrl) {
    this.props.onClick(actionUrl);
  }

  render() {
    return (
      <List>
        {this.props.people && this.props.people.length > 0 ?
          this.props.people.map((person) => {
            const avatarSrc = {};
            let initial = null;
            if (person.avatarUrl && person.avatarUrl.length) {
              avatarSrc.src = person.avatarUrl;
            } else {
              initial = calcInitials(person.name);
            }

            const actions = {};
            if (person.actionUrl && person.actionUrl.length > 0) {
              actions.onClick = this.handleOnClick.bind(this, person.actionUrl);
            }

            const avatarSize = this.props.avatarSize || 40;

            return (
              <ListItem
                innerDivStyle={{ paddingTop: '15px', paddingLeft: '15px', fontSize: '13px' }}
                key={person.uniqueId}
                {...actions}
                primaryText={`${person.name} (${person.uniqueId})`}
                leftAvatar={<Avatar user={person} size={avatarSize}>{initial}</Avatar>}
              />
            );
          }) : ''}
      </List>
    );
  }
}

UserList.propTypes = {
  people: React.PropTypes.array.isRequired
};

export default UserList;
