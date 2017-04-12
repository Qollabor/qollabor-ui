import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import { PasswordChanger } from '../index';

storiesOf('User/PasswordChanger', module).addDecorator(story => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('Should show the password change form', () => (
    <div className="center-component">
      <PasswordChanger
        open={true}
        onRequestClose={action('onRequestClose')}
      />
    </div>
  ));
