import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Chip } from 'material-ui';
import { fetchAvatar } from './helpers';
import { calcInitials } from '../people-list/helpers/calcInitials';

export class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: this.props.user.avatar,
      userId: this.props.user.userId,
      userName: this.props.user.name,
      avatarLastModified: this.props.user.avatarLastModified
    };
  }

  componentWillMount() {
    this.fetchAvatarDetails(this.props.user.userId, this.props.user.avatarLastModified);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.userId === nextProps.user.userId && nextProps.avatar) {
      this.setState({
        avatar: nextProps.avatar
      });
    }
    if (this.props.user.userId !== nextProps.user.userId) {
      this.fetchAvatarDetails(nextProps.user.userId, nextProps.user.avatarLastModified);
    }
  }

  fetchAvatarDetails(userId, lastModified) {
    if (lastModified && userId) {
      fetchAvatar(userId, lastModified).then((response) => {
        this.setState({
          avatar: response.body.avatar
        });
      });
    }
  }

  handleOnClick(userId, event) {
    if (this.props.onClick) {
      this.props.onClick(userId, event);
    }
  }

  render() {
    const padding = this.props.padding || 0;
    const avatarSize = this.props.size || 100;
    const person = this.props.user;
    const isChipView = this.props.chipView || false;

    const actions = {};
    const style = { marginRight: `${padding}px`, cursor: 'pointer' };
    actions.onClick = this.handleOnClick.bind(this, person.userId);

    const avatarSrc = {};
    let initial = null;
    if (this.state.avatar) {
      avatarSrc.src = this.state.avatar;
    } else if (person.avatarUrl && person.avatarUrl.length) {
      avatarSrc.src = person.avatarUrl;
    } else {
      initial = calcInitials(person.name);
    }

    // If chip view is enabled, return avatar chip view, else return avatar simple view.
    return (
      <div style={{ float: 'left' }} title={`${person.name} (${person.userId})`}>
        {isChipView ?
          <Chip key={person.name}>
            <Avatar
              style={style}
              {...actions}
              {...avatarSrc}
              size={avatarSize}
            >
              {initial}
            </Avatar>
            {person.name}
          </Chip> :
          <Avatar
            style={style}
            {...actions}
            {...avatarSrc}
            size={avatarSize}
          >
            {initial}
          </Avatar>
        }
      </div>
    );
  }
}

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  onClick: PropTypes.func,
  padding: PropTypes.number,
  size: PropTypes.number,
  user: PropTypes.object.isRequired,
  chipView: PropTypes.bool
};

export default UserAvatar;
