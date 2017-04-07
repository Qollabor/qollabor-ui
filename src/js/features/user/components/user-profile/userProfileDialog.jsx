import React from 'react';
import { Dialog } from 'material-ui';
import UserProfile from './userProfile';

const customContentStyle = {
  width: '500px',
  maxWidth: 'none'
};

export class UserProfileDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.requestClose = this.requestClose.bind(this);
  }


  componentWillMount() {
    if (this.props.init) {
      this.props.init();
    }
  }

  componentWillReceiveProps(props) {
    if (props.hideProfileForm && props.onRequestClose) {
      props.onRequestClose();
    }
  }

  handleOnSubmit(userData) {
    if (this.props.saveData) {
      this.props.saveData(userData);
    }
  }

  requestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    return (
      <Dialog
        title={'Change Profile'}
        modal={false}
        open={this.props.open}
        contentStyle={customContentStyle}
        onRequestClose={this.requestClose}
        bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
      >
        {this.props.profile &&
          <UserProfile
            onSave={this.handleOnSubmit} onCancel={this.requestClose}
            onAvatarUpdate={this.props.updateAvatar} saveError={this.props.error} initialValues={this.props.profile}
          />
        }
      </Dialog>
    );
  }
}

UserProfileDialog.propTypes = {
  error: React.PropTypes.object,
  init: React.PropTypes.func,
  onRequestClose: React.PropTypes.func,
  open: React.PropTypes.bool,
  profile: React.PropTypes.object,
  saveData: React.PropTypes.func,
  updateAvatar: React.PropTypes.func
};

export default UserProfileDialog;
