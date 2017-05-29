import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CaseList from '../caseList';
import fakeData from './data.json';

const fakeUserDetails = {
  email: 'fake@example.com',
  name: 'Wilbur',
  roles: ['ADMIN']
};

storiesOf('Case List UI', module).addDecorator(story => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  ))
  .add('display case header details ', () =>
    (<div className="center-component">
      <CaseList items={fakeData} userDetails={fakeUserDetails} caseTeamUsers={{}} />
    </div>)
);
