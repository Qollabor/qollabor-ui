import React from 'react';
import { Avatar, List, ListItem, Popover } from 'material-ui';
import { calcInitials } from '../helpers/calcInitials';

class PeoplePopupList extends React.Component {

  handleOnClick(actionUrl) {
    this.props.onClick(actionUrl);
  }

  requestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.showMoreEvent}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.requestClose.bind(this)}
      >
        <div>
          <List>
            {this.props.people && this.props.people.length > 0 ?
              this.props.people.map((person) => {
                const avatarSrc = {};
                let initial = null;
                if (person.avatarUrl && person.avatarUrl.length) {
                  avatarSrc.src = person.avatarUrl;
                } else {
                  initial = calcInitials(person.fullName);
                }

                const actions = {};
                if (person.actionUrl && person.actionUrl.length > 0) {
                  actions.onClick = this.handleOnClick.bind(this, person.actionUrl);
                }

                const avatarSize = this.props.avatarSize || 40;

                return (
                  <ListItem
                    innerDivStyle={{ paddingTop: '15px', fontSize: '13px' }}
                    key={person.userName}
                    {...actions}
                    primaryText={`${person.fullName} (${person.userName})`}
                    leftAvatar={<Avatar {...avatarSrc} size={avatarSize}>{initial}</Avatar>}
                  />
                );
              }) : ''}
          </List>
        </div>
      </Popover>
    );
  }
}

PeoplePopupList.propTypes = {
  people: React.PropTypes.array.isRequired
};

export default PeoplePopupList;
