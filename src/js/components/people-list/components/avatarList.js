import React from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';
import Avatar from '../../user-avatar';
import styles from '../styles';

class AvatarList extends React.Component {

  handleOnClickAvatarAction(userId) {
    if (this.props.onClick) {
      this.props.onClick(userId);
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

    const avatarList = [];
    const people = this.props.people || [];
    for (let index = 0; (index <= (maxPeopleInList - 1) && (index <= people.length - 1)); index++) {
      const person = people[index];
      avatarList.push(
        <Avatar
          key={person.name}
          user={person}
          size={avatarSize}
          onClick={this.handleOnClickAvatarAction.bind(this)}
          padding={paddingBetweenAvatar}
        />
      );
    }

    avatarList.push(
      <MaterialAvatar
        onClick={this.handleShowMoreAction.bind(this)}
        style={styles.showMore}
        key="avatarActionHandler"
        size={avatarSize}
      >
        ...
      </MaterialAvatar>
    );

    return (
      <div>
        {avatarList}
      </div>
    );
  }
}

AvatarList.propTypes = {
  people: React.PropTypes.array.isRequired,
  maxPeopleInList: React.PropTypes.number.isRequired,
  maxLength: React.PropTypes.number,
  avatarSize: React.PropTypes.number,
  onClick: React.PropTypes.func,
  onShowMoreAction: React.PropTypes.func.isRequired
};

export default AvatarList;
