import React from 'react';
import { Dialog } from 'material-ui';
import PasswordForm from './passwordForm';

const customContentStyle = {
  width: '325px',
  maxWidth: 'none'
};

export class PasswordChanger extends React.Component {

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
        title={'Change Password"'}
        modal={false}
        open={this.props.open}
        contentStyle={customContentStyle}
        onRequestClose={this.requestClose.bind(this)}
        bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
      >
        <PasswordForm
          onSave={this.handleOnSubmit.bind(this)} onCancel={this.requestClose.bind(this)}
          saveError={this.props.error}
        />
      </Dialog>
    );
  }
}

PasswordChanger.propTypes = {
  onRequestClose: React.PropTypes.func,
  open: React.PropTypes.bool
};

export default PasswordChanger;
