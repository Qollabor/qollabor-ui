import React from 'react';
import { Avatar, Popover } from 'material-ui';
import ToolTip from '../../../../components/tooltip';
import styles from './styles';
import PeopleInvolvedList from '../people-involved-list';
import { registry } from 'app-registry';

class PeopleInvolvedRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreEvent: false
    };
  }

  handleAvatarAction(actionUrl) {
    registry.get('logger').info(`handle action url: ${actionUrl}`);
  }

  handleShowMoreAction(event) {
    event.preventDefault();
    this.setState({
      showMoreOpen: true,
      showMoreEvent: event.currentTarget
    });
  }

  handleShowMoreClose() {
    this.setState({
      showMoreOpen: false
    });
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
          this.props.people.map((person, index) => {
            let avatarBody;
            let mainBody;

            if (index <= (this.props.maxPeopleInList - 1)) {
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

              mainBody = (<ToolTip
                key={person.userName}
                style={{ float: 'left' }}
                message={`${person.fullName} (${person.userName})`}
                tagName="div"
              >
                {avatarBody}
              </ToolTip>);
            } else {
              if (index === this.props.maxPeopleInList) {
                mainBody = ([
                  mainBody,
                  <Avatar
                    onClick={this.handleShowMoreAction.bind(this)}
                    style={styles.showMore}
                    key={person.userName + this.props.people.length}
                  >
                    ...
                  </Avatar>
                ]);
              }
            }

            return (
              mainBody
              );
          }) : ''}
        <Popover
          open={this.state.showMoreOpen}
          anchorEl={this.state.showMoreEvent}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleShowMoreClose.bind(this)}
        >
          <div>
            <PeopleInvolvedList people={this.props.people}/>
          </div>
        </Popover>
      </div>
    );
  }
}

PeopleInvolvedRow.propTypes = {
  people: React.PropTypes.array.isRequired,
  showMoreOpen: React.PropTypes.bool,
  maxPeopleInList: React.PropTypes.number
};

PeopleInvolvedRow.displayName = 'PeopleInvolvedRow';

export default PeopleInvolvedRow;
