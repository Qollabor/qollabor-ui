import React from 'react';
import { Avatar } from 'material-ui';
import { fetchAvatar } from './helpers';

export class UserAvatar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      avatar: this.props.avatar
    };
  }

  componentDidMount() {
    fetchAvatar(this.props.userId).then(response => {
      response.text()
      .then(result => {
        this.setState({
          avatar: JSON.parse(result).avatar
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.avatar
    });
  }

  render() {
    const avatar = this.state.avatar;
    return (
      <div className="previewComponent">
        <Avatar
          src={avatar}
          size={100}
          alt="Avatar"
        />
      </div>
    );
  }
}

UserAvatar.displayName = 'UserAvatar';

UserAvatar.propTypes = {
  userId: React.PropTypes.string.isRequired
};

export default UserAvatar;
