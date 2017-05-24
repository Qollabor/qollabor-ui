import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'material-ui';
import PasswordForm from './passwordForm';

const customContentStyle = {
  width: '325px',
  maxWidth: 'none'
};

export class PasswordChanger extends React.Component {
  constructor(props) {
    super(props);
    this.requestClose = this.requestClose.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

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
        onRequestClose={this.requestClose}
        bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
      >
        <PasswordForm
          onSave={this.handleOnSubmit} onCancel={this.requestClose}
          saveError={this.props.error}
        />
      </Dialog>
    );
  }
}

PasswordChanger.propTypes = {
  changePassword: PropTypes.func,
  error: PropTypes.object,
  init: PropTypes.func,
  onRequestClose: PropTypes.func,
  open: PropTypes.bool
};

export default PasswordChanger;
