import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Paper } from 'material-ui';
import { CaseInformation } from './index';

const paperStyle = { padding: '5px', width: '300px' };

const baseProps = {
  title: 'Case information',
  error: {},
  isFetching: false,
  onMount: action('mount')
};

storiesOf('Case/Information', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('loading', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <CaseInformation {...baseProps} caseId="should go there" isFetching={true} />
      </Paper>
    </div>
  ))
  .add('very long title', () => {
    const theCase = {
      definition: 'Social benefits application with a very long title with an qwertyuioplkjhgfdsammnbvcxz` word'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <CaseInformation case={theCase} {...baseProps} />
        </Paper>
      </div>
    );
  })
  .add('short title', () => {
    const theCase = {
      definition: 'Social benefits application'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <CaseInformation case={theCase} {...baseProps} />
        </Paper>
      </div>
    );
  })
  .add('error', () => {
    const error = {
      isError: true,
      message: 'error message very long and dirty so ugly that I never seen it before'
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <CaseInformation title="Case information" error={error} />
        </Paper>
      </div>
    );
  });
