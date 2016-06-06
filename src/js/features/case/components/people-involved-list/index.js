import React from 'react';
import { Avatar } from 'material-ui';
import { registry } from 'app-registry';
class PeopleInvolvedList extends React.Component {

  handleAvatarAction(actionUrl) {
    registry.get('logger').info(`handle action url: ${actionUrl}`);
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

            const mainBody = (
              <div style={{ overflow: 'hidden' }} key={person.userName}>
                <div style={{ marginTop: '2px', marginLeft: '5px', float: 'left' }}>
                    {avatarBody}
                </div>
                <div style={{ fontSize: '12px', marginTop: '15px', marginLeft: '50px' }}>
                  {person.fullName} ({person.userName})
                </div>
              </div>);

            return (
              mainBody
              );
          }) : ''}
      </div>
    );
  }
}

PeopleInvolvedList.propTypes = {
  people: React.PropTypes.array.isRequired
};

export default PeopleInvolvedList;
