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
    if (props.hidePasswordForm && props.onRequestClose) {
      props.onRequestClose();
    }
  }

  handleOnSubmit(paswordData) {
    if (this.props.changePassword) {
      this.props.changePassword(paswordData);
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
        <UserProfile
          onSave={this.handleOnSubmit.bind(this)} onCancel={this.requestClose.bind(this)}
          saveError={this.props.error} initialValues={this.props.profile}
        />
      </Dialog>
    );
  }
}

UserProfileDialog.propTypes = {
  onRequestClose: React.PropTypes.func,
  open: React.PropTypes.bool
};

export default UserProfileDialog;
