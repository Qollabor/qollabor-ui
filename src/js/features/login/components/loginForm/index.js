import { connect } from 'react-redux';
import { LoginForm as LoginFormComponent } from './loginForm';

function mapStateToProps(state) {
  return {
    errors: state.login.get('errors').toJS(),
    isLoggingIn: state.login.get('isLoggingIn')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (username, password) => {
      dispatch({ type: 'LOGIN:DO_LOGIN', username, password });
    },
    onCancel: () => dispatch({ type: 'LOGIN:CANCEL_LOGIN' })
  };
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginFormComponent);

