import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Paper } from 'material-ui';
import { Provider } from 'react-redux';
import { store } from '../../../../store.js';
import { ActionButtons } from './actionButtons';

const paperStyle = { padding: '5px', width: '250px' };

storiesOf('Task/Action', module).addDecorator((story) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>{story()}</MuiThemeProvider>
  </Provider>
  ))
  .add('disabled', () => {
    const props = {
      taskId: 'dummy',
      caseId: 'dummy',
      taskDetails: {
        assignee: '',
        taskState: ''
      },
      availableActions: [
        {
          action: 'run',
          label: 'run',
          backgroundColor: 'orange'
        },
        {
          action: 'move',
          label: 'move',
          backgroundColor: 'red'
        }
      ],

      onActionClick: action('action'),
      onTransitionClick: action('transition')
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <ActionButtons {...props} />
        </Paper>
      </div>
    );
  });
