import React from 'react';
import { Avatar, Chip } from 'material-ui';
import { fetchAvatar } from './helpers';
import { calcInitials } from '../people-list/helpers/calcInitials';

export class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: this.props.user.avatar,
      uniqueId: this.props.user.uniqueId,
      userName: this.props.user.name,
      avatarLastModified: this.props.user.avatarLastModified
    };
  }

  componentWillMount() {
    const lastModified = this.props.user.avatarLastModified;
    if (lastModified && this.props.user.uniqueId) {
      fetchAvatar(this.props.user.uniqueId, lastModified).then(response => {
        this.setState({
          avatar: response.body.avatar
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.uniqueId === nextProps.user.uniqueId && nextProps.avatar) {
      this.setState({
        avatar: nextProps.avatar
      });
    }
  }

  handleOnClick(userId, event) {
    this.props.onClick(userId, event);
  }

  render() {
    const padding = this.props.padding || 0;
    const avatarSize = this.props.size || 100;
    const person = this.props.user;
    const isChipView = this.props.chipView || false;

    const actions = {};
    const style = { marginRight: `${padding}px`, cursor: 'pointer' };
    actions.onClick = this.handleOnClick.bind(this, person.uniqueId);

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
      <div style={{ float: 'left' }} title={`${person.name} (${person.uniqueId})`}>
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
  user: React.PropTypes.object.isRequired,
  chipView: React.PropTypes.boolean
};

export default UserAvatar;
