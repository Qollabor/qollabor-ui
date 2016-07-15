import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { store } from '../../../../../store.js';
import CaseTeamSelector from '../caseTeamSelector';

const roles = ['Manager', 'Reviewer', 'Approver'];

storiesOf('Case Team Selector', module).addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('With Empty data', () =>
    (<div className="center-component">
      <CaseTeamSelector roles={roles}/>
    </div>));
