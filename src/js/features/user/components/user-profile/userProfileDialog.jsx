import React from 'react';
import { Dialog } from 'material-ui';
import UserProfile from './userProfile';

const customContentStyle = {
  width: '500px',
  maxWidth: 'none'
};

export class UserProfileDialog extends React.Component {

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
        title={"Change Profile"}
        modal={false}
        open={this.props.open}
        contentStyle={customContentStyle}
        onRequestClose={this.requestClose.bind(this)}
        bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
      >
        {this.props.profile &&
          <UserProfile
            onSave={this.handleOnSubmit.bind(this)} onCancel={this.requestClose.bind(this)}
            onAvatarUpdate={this.props.updateAvatar} saveError={this.props.error} initialValues={this.props.profile}
          />
        }
      </Dialog>
    );
  }
}

UserProfileDialog.propTypes = {
  onRequestClose: React.PropTypes.func,
  open: React.PropTypes.bool
};

export default UserProfileDialog;
