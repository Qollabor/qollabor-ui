import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import caseData from './case-data.json';
import caseTeam from './case-team.json';
import { Provider } from 'react-redux';
import { store } from '../../../../../../store.js';
import CaseDocument from '../case-document/caseDocument';


storiesOf('Case Detail UI', module).addDecorator((story) => (
  <Provider store={store} config={{}}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('display case header details ', () =>
    (<div className="center-component">
      <CaseDocument document={caseData} userDetails={{}} team={caseTeam} caseTeamUsers={{}} />
    </div>)
);
