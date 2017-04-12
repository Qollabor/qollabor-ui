import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginForm from './loginForm';

const loginCallback = {
  onLogin: action('Login'),
  onCancel: action('Cancel')
};

storiesOf('Login/Form', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('The login form with empty fields ', () => (
    <div className="center-component">
      <LoginForm {...loginCallback} />
    </div>
  ))
  .add('The login form centered in the page', () => (
    <div>
      <LoginForm {...loginCallback} alignCenter={true} />
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
        alignCenter={false}
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
