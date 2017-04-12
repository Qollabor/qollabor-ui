import React from 'react';
import UserAvatar from '../../../../../../components/user-avatar';
import { getUserDetails } from './helpers';

const labelStyle = {
  color: 'rgb(99, 89, 89)',
  fontWeight: 'bold',
  lineHeight: '22px',
  fontSize: '12px'
};

const divStyle = {
  padding: '14px 14px 14px 0px'
};

export class CaseUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails: this.props.userDetails,
      userId: this.props.userId,
      label: ''
    };
  }

  componentWillMount() {
    this.fetchUserDetails(this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      this.fetchUserDetails(nextProps.userId);
    }
  }

  fetchUserDetails(userId) {
    if (!this.props.userDetails) {
      getUserDetails(userId).then((response) => {
        this.setState({
          userDetails: response.body
        });
      });
    }
  }

  render() {
    const { userDetails } = this.state;
    return (
      <div style={divStyle}>
        <label style={labelStyle}>{this.props.label}</label>
        {userDetails && <div>{<UserAvatar user={userDetails} size={40} chipView={true} />}</div>}
      </div>

    );
  }
}

CaseUser.propTypes = {
  label: React.PropTypes.string,
  userDetails: React.PropTypes.object,
  userId: React.PropTypes.string.isRequired
};
