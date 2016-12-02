import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import { store } from '../../../store.js';
import CaseList from '../cases';
import fakeData from './data.json';

storiesOf('Case Table UI', module).addDecorator((story) => (
  <Provider store={store} config={{}}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('display case header details ', () =>
    (<div className="center-component">
      <CaseList items={fakeData} userDetails={{}} caseTeamUsers={{}} />
    </div>)
);
