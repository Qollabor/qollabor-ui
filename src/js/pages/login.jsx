import React from 'react';
import { LoginForm } from '../features/login';

class LoginFormPage extends React.Component {
  render() {
    return (
      <div >
        <LoginForm alignCenter={true} />
      </div>
    );
  }
}

export default LoginFormPage;
