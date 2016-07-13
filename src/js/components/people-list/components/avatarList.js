import React from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';
import Avatar from '../../user-avatar';
import styles from '../styles';

class AvatarList extends React.Component {

  handleOnClickAvatarAction(actionUrl) {
    if (this.props.onClick) {
      this.props.onClick(actionUrl);
    }
  }

  handleShowMoreAction(event) {
    if (this.props.onShowMoreAction) {
      this.props.onShowMoreAction(event);
    }
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
                  key={person.name}
                  user={person}
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
      </div>
    );
  }
}

AvatarList.propTypes = {
  people: React.PropTypes.array.isRequired,
  maxPeopleInList: React.PropTypes.number.isRequired,
  maxLength: React.PropTypes.number,
  avatarSize: React.PropTypes.number,
  onClick: React.PropTypes.func.isRequired,
  onShowMoreAction: React.PropTypes.func.isRequired
};

export default AvatarList;
