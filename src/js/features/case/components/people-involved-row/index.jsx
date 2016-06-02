import React from 'react';
import { Avatar } from 'material-ui';
import ToolTip from '../../../../components/tooltip';
import registry from 'app-registry';

class PeopleInvolvedRow extends React.Component {

  handleAvatarAction(actionUrl) {
    registry.get('logger').info(actionUrl);
  }

  calcInitials(fullName) {
    if (fullName && fullName.length > 0) {
      const initials = fullName.split(' ');
      return ((initials.shift()[0] + initials.pop()[0]).toUpperCase());
    }
    return 'XX';
  }

  render() {
    return (
      <div>
        {this.props.people && this.props.people.length > 0 ?
          this.props.people.map((person) => {
            let avatarBody;
            if (person.avatarUrl && person.avatarUrl.length > 0) {
              if (person.actionUrl && person.actionUrl.length > 0) {
                avatarBody = (
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleAvatarAction.bind(this, person.actionUrl)}
                    src={person.avatarUrl}
                    size={40}
                  />);
              } else {
                avatarBody = <Avatar src={person.avatarUrl} size={40} />;
              }
            } else {
              if (person.actionUrl && person.actionUrl.length > 0) {
                avatarBody = (
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    onClick={this.handleAvatarAction.bind(this, person.actionUrl)}
                  >
                    {this.calcInitials(person.fullName)}
                  </Avatar>);
              } else {
                avatarBody = <Avatar>{this.calcInitials(person.fullName)}</Avatar>;
              }
            }

            return (
              <ToolTip
                key={person.userName}
                style={{ float: 'left' }}
                message={`${person.fullName} (${person.userName})`}
                tagName="div"
              >
                {avatarBody}
              </ToolTip>
              );
          }) : ''}
      </div>
    );
  }
}

PeopleInvolvedRow.propTypes = {
  people: React.PropTypes.array.isRequired
};

export default PeopleInvolvedRow;
