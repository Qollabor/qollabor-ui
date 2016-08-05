import React from 'react';

import { Paper, TextField, RaisedButton, FlatButton, RefreshIndicator } from 'material-ui';

import styles from './styles';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      changed: {
        username: false,
        password: false,
        login: false
      }
    };
  }

  componentWillReceiveProps(props) {
    const errors = props.errors || {};
    const newState = {
      changed: this.state.changed
    };
    if (errors.username && errors.username.length > 0) {
      newState.changed.username = false;
    }
    if (errors.password && errors.password.length > 0) {
      newState.changed.password = false;
    }

    if (errors.login && errors.login.length > 0) {
      newState.changed.login = false;
    }
    this.setState(newState);
  }

  handleOnLogIn(event) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    this.props.onLogin(this.state.username, this.state.password);
  }

  handleOnCancel(event) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    this.props.onCancel();
  }

  handleChange(type, event) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    const newState = { [type]: event.target.value, changed: this.state.changed };
    newState.changed[type] = true;
    this.setState(newState);
  }

  render() {
    const errors = this.props.errors || {};

    const usernameProps = {
      errorText: !this.state.changed.username ? errors.username : ''
    };

    const passwordProps = {
      errorText: !this.state.changed.password ? errors.password : ''
    };

    const loginProps = {
      errorText: !this.state.changed.login ? errors.login : ''
    };

    const progressIndicator =
      this.props.isLoggingIn ?
        <RefreshIndicator
          size={30}
          left={5}
          top={5}
          status="loading"
          style={styles.progress}
        />
        : false;

    const subContainerStyle =
      Object.assign({}, styles.alignSubContainer, { margin: this.props.alignCenter ? '0px auto' : '0px' });

    return (
      <div style={styles.alignContainer}>
        <div style={subContainerStyle}>
          <Paper style={styles.container}>
            <form onSubmit={this.handleOnLogIn.bind(this)}>
              <div style={styles.textFieldWrapper}>
                <TextField
                  hintText="Username"
                  {...usernameProps}
                  disabled={this.props.isLoggingIn}
                  value={this.state.username}
                  onChange={this.handleChange.bind(this, 'username')}
                />
              </div>
              <div style={styles.textFieldWrapper}>
                <TextField
                  hintText="Password"
                  type="password"
                  {...passwordProps}
                  disabled={this.props.isLoggingIn}
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, 'password')}
                />
              </div>
              {loginProps.errorText && <div style={styles.errorFieldWrapper}>
                {loginProps.errorText}
              </div>}
              <FlatButton
                label="Cancel"
                type="button"
                secondary={true}
                style={styles.button}
                disabled={this.props.isLoggingIn}
                onClick={this.handleOnCancel.bind(this)}
              />
              <RaisedButton
                label="Login"
                primary={true}
                style={styles.button}
                type="submit"
                disabled={this.props.isLoggingIn}
              />
              {progressIndicator}
            </form>
          </Paper>
        </div>
      </div>

    );
  }
}

LoginForm.displayName = 'LoginForm';

LoginForm.propTypes = {
  alignCenter: React.PropTypes.bool,
  errors: React.PropTypes.object,
  isLoggingIn: React.PropTypes.bool,
  onLogin: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
};

export default LoginForm;
