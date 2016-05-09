import { connect } from 'react-redux';
import { AuthVerify as AuthVerifyComponent } from './authVerify.jsx';

function mapStateToProps(state) {
  return {
    isVerifyAuth: state.login.get('isVerifyAuth')
  };
}

export const AuthVerify = connect(mapStateToProps, null)(AuthVerifyComponent);

