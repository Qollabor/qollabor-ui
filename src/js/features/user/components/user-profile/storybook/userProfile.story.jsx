import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import fakeData from './data.json';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import UserProfile from '../userProfile';

storiesOf('User/UserProfile', module).addDecorator(story => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('Should show the admin profile', () => (
    <div
      className="center-component"
      style={{
        width: '500px'
      }}
    >
      <UserProfile
        data={fakeData.editadminuser}
        initialValues={fakeData.editadminuser}
        handleSubmit={action('handleSubmit')}
        onSave={action('onSave')}
        onCancel={action('onCancel')}
      />
    </div>
  ));
