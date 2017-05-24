import PropTypes from 'prop-types';
import React from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';
import Avatar from '../../user-avatar';
import styles from '../styles';

class AvatarList extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnClickAvatarAction = this.handleOnClickAvatarAction.bind(this);
    this.handleShowMoreAction = this.handleShowMoreAction.bind(this);
  }

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
    const parentDivStyle = (this.props.disabled) ? styles.disabled : null;

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
          chipView={this.props.chipView}
          key={person.name}
          user={person}
          size={avatarSize}
          onClick={this.handleOnClickAvatarAction}
          padding={paddingBetweenAvatar}
        />
      );
    }

    avatarList.push(
      <MaterialAvatar
        onClick={this.handleShowMoreAction}
        style={styles.showMore}
        key="avatarActionHandler"
        size={avatarSize}
      >
        ...
      </MaterialAvatar>
    );

    return (
      <div style={parentDivStyle}>
        {avatarList}
      </div>
    );
  }
}

AvatarList.propTypes = {
  chipView: PropTypes.bool,
  disabled: PropTypes.bool,
  people: PropTypes.array.isRequired,
  maxPeopleInList: PropTypes.number.isRequired,
  maxLength: PropTypes.number,
  avatarSize: PropTypes.number,
  onClick: PropTypes.func,
  onShowMoreAction: PropTypes.func.isRequired
};

export default AvatarList;
