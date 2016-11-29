import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { store } from '../../../store.js';
import UserSelector from '../userSelector';

import fakeData from './data.json';

storiesOf('CaseModels/UsersSelector', module).addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('With Empty data', () =>
    (<div className="center-component">
      <UserSelector />
    </div>))
  .add('With Users', () =>
  (<div className="center-component">
    <UserSelector
      users={fakeData.members}
      onUserSelectChange={action('USER_SELECTOR:USER:SELECTION:CHANGE')}
      onFilterChange={action('USER_SELECTOR:FILTERCHANGE')}
    />
  </div>));
