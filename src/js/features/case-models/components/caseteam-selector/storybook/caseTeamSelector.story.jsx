import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CaseTeamSelector from '../caseTeamSelector';

const roles = ['Manager', 'Reviewer', 'Approver'];

storiesOf('Case Team Selector', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('With Empty data', () =>
    (<div className="center-component">
      <CaseTeamSelector roles={roles}/>
    </div>));
