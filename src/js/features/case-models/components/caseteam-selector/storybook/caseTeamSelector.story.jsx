import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import CaseTeamSelector from '../caseTeamSelector';

const roles = {
  Manager: [{ name: 'Thijs Petter', userId: 'thijsp' }],
  Reviewer: [{ name: 'Martijn van der Plaat', userId: 'martijnvdp' }],
  Approver: [{ name: 'Danny Kruitbosch', userId: 'dannyk' }]
};

storiesOf('CaseModels/CaseTeamSelector', module).addDecorator(story => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('With Empty data', () =>
    (<div className="center-component">
      <CaseTeamSelector roles={[]} />
    </div>))
  .add('With data', () =>
    (<div className="center-component">
      <CaseTeamSelector roles={roles} />
    </div>));
