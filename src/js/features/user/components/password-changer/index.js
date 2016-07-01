import { connect } from 'react-redux';
import { PasswordChanger as PasswordChangerComponent } from './passwordChanger.jsx';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (passwordData) => {
    dispatch({ type: 'USER:CHANGE_PASSWORD', oldPassword: passwordData.oldPassword,
    newPassword: passwordData.newPassword });
  }
});

export const PasswordChanger = connect(mapStateToProps, mapDispatchToProps)(PasswordChangerComponent);

