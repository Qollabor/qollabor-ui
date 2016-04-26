import React from 'react';
import { storiesOf } from '@kadira/storybook';

import LoginForm from './loginForm.jsx';

const loginCallback = {
  onLogin: (username, password) => {
    console.log('Log in: ', username, password);
  },
  onCancel: () => {
    console.log('Cancel');
  }
};

storiesOf('Login Form', module)
  .add('The login form with empty fields ', () => (
    <div className="center-component">
      <LoginForm {...loginCallback} />
    </div>
  ))
  .add('The login form with username error message ', () => (
    <div className="center-component">
      <LoginForm
        {...loginCallback}
        errors={{ username: 'Some username error' }}
      />
    </div>
  ))
  .add('The login form with password error message ', () => (
    <div className="center-component">
      <LoginForm
        {...loginCallback}
        errors={{ password: 'Some password error' }}
      />
    </div>
  ))
  .add('The login form with both error message ', () => (
    <div className="center-component">
      <LoginForm
        {...loginCallback}
        errors={{
          username: 'Some username error',
          password: 'Some password error'
        }}
      />
    </div>
  ))
  .add('The user is logging in', () => (
    <div className="center-component">
      <LoginForm
        {...loginCallback}
        isLoggingIn={true}
      />
    </div>
  ));
