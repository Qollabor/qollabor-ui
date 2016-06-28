import React from 'react';
import { Avatar as MaterialAvatar, Popover } from 'material-ui';
import styles from './styles';
import PeoplePopupList from './components/popupList';
import { Avatar } from './components/avatar';

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreEvent: null,
      showMoreOpen: false
    };
  }

  handleOnClickAvatarAction(actionUrl) {
    if (this.props.onClick) {
      this.props.onClick(actionUrl);
    }
  }

  handleShowMoreAction(event) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    this.setState({
      showMoreOpen: true,
      showMoreEvent: event.currentTarget
    });
  }

  handleShowMoreClose() {
    this.setState({
      showMoreEvent: null,
      showMoreOpen: false
    });
  }

  render() {
    const avatarSize = this.props.avatarSize || 30;
    const maxLength = this.props.maxLength || 200;
    const paddingBetweenAvatar = 1;

    let maxPeopleInList = this.props.maxPeopleInList;
    if (Math.floor(maxLength / (avatarSize + paddingBetweenAvatar)) + 1) {
      maxPeopleInList =
        Math.min(this.props.maxPeopleInList, Math.floor(maxLength / (avatarSize + paddingBetweenAvatar)));
    }

    return (
      <div>
        {this.props.people && this.props.people.length > 0 ?
          this.props.people.map((person, index) => {
            let mainBody;

            if (index <= (maxPeopleInList - 1)) {
              mainBody = (
                <Avatar
                  key={person.userName}
                  person={person}
                  size={avatarSize}
                  onClick={this.handleOnClickAvatarAction.bind(this)}
                  padding={paddingBetweenAvatar}
                />
              );
            } else {
              if (index === maxPeopleInList) {
                mainBody = ([
                  mainBody,
                  <MaterialAvatar
                    onClick={this.handleShowMoreAction.bind(this)}
                    style={styles.showMore}
                    key={person.userName + this.props.people.length}
                    size={avatarSize}
                  >
                    ...
                  </MaterialAvatar>
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
            <PeoplePopupList
              people={this.props.people}
              onClick={this.handleOnClickAvatarAction.bind(this)}
              avatarSize={avatarSize}
            />
          </div>
        </Popover>
      </div>
    );
  }
}

PeopleList.propTypes = {
  people: React.PropTypes.array.isRequired,
  maxPeopleInList: React.PropTypes.number.isRequired,
  maxLength: React.PropTypes.number,
  avatarSize: React.PropTypes.number
};

PeopleList.displayName = 'PeopleList';

export default PeopleList;
