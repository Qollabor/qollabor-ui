import React from 'react';
import { Avatar } from 'material-ui';
import { fetchAvatar } from './helpers';
import { calcInitials } from '../people-list/helpers/calcInitials';

export class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: this.props.user.avatar,
      uniqueId: this.props.uniqueId,
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
    this.setState({
      avatar: nextProps.avatar
    });
  }

  render() {
    const { avatar, userName } = this.state;
    let textAvatar = null;
    if (! avatar) {
      textAvatar = calcInitials(userName);
    }
    return (
      <div className="previewComponent" title={userName}>
        <Avatar
          src={avatar}
          size={100}
          alt="Avatar"
        >
        {textAvatar}
        </Avatar>
      </div>
    );
  }
}

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  user: React.PropTypes.object.isRequired
};

export default UserAvatar;
