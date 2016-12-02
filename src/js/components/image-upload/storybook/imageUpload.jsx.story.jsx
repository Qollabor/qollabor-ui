import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { store } from '../../../store.js';
import { ImageUpload } from '../index';

const user = {
  userName: 'dannyk',
  fullName: 'Danny Kruitbosch',
  avatarUrl: 'https://lh6.googleusercontent.com/-wmA9kgZUUwo/AAAAAAAAAAI/AAAAAAAAABU/nPYkBB_N5x4/photo.jpg?sz=328',
  uniqueId: 'dannyk'
};


storiesOf('User/ImageUpload', module).addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('Should show the image uploader', () => (
    <div className="center-component">
      <ImageUpload user={user} onUpload={action('onUpload')} />
    </div>
  ));
