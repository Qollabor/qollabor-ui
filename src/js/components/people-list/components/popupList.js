import React from 'react';
import { Avatar } from 'material-ui';
import { calcInitials } from '../helpers/calcInitials';

class PeoplePopupList extends React.Component {

  handleOnClick(actionUrl) {
    this.props.onClick(actionUrl);
  }

  render() {
    return (
      <div>
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
              <div
                key={person.userName}
                style={{ overflow: 'hidden' }}
                {...actions}
              >
                <div style={{ marginTop: '2px', marginLeft: '5px', float: 'left' }}>
                  <Avatar {...avatarSrc} size={avatarSize}>{initial}</Avatar>
                </div>
                <div style={{ fontSize: '12px', marginTop: '15px', marginLeft: '50px' }}>
                  {person.fullName} ({person.userName})
                </div>
              </div>);
          }) : ''}
      </div>
    );
  }
}

PeoplePopupList.propTypes = {
  people: React.PropTypes.array.isRequired
};

export default PeoplePopupList;
