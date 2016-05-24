import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { Paper } from 'material-ui';
import { TaskTransitions } from './index';

const paperStyle = { padding: '5px', width: '250px' };

storiesOf('Task/TaskTransitions', module)
  .add('short list', () => {
    const props = {
      taskId: 'dummy',
      availableTransitions: [
        {
          action: 'run',
          label: 'run',
          backgroundColor: 'orange'
        },
        {
          action: 'move',
          label: 'move',
          backgroundColor: 'red'
        },
        {
          action: 'jump',
          label: 'jump',
          backgroundColor: 'olive'
        }
      ],
      onButtonClick: action('transition')
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <TaskTransitions {...props} />
        </Paper>
      </div>
    );
  })
  .add('long list', () => {
    const props = {
      taskId: 'dummy',
      availableTransitions: [
        {
          action: 'run',
          label: 'run',
          backgroundColor: 'orange'
        },
        {
          action: 'move',
          label: 'move',
          backgroundColor: 'red'
        },
        {
          action: 'jump',
          label: 'jump',
          backgroundColor: 'olive'
        },
        {
          action: 'verylong',
          label: 'very long laasdhwefheu bel',
          backgroundColor: 'olive'
        },
        {
          action: 'one',
          label: 'one',
          backgroundColor: 'olive'
        },
        {
          action: 'two',
          label: 'two two two two two',
          backgroundColor: 'olive'
        }
      ],
      onButtonClick: action('transition')
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <TaskTransitions {...props} />
        </Paper>
      </div>
    );
  })
  .add('disabled', () => {
    const props = {
      taskId: 'dummy',
      availableTransitions: [
        {
          action: 'run',
          label: 'run',
          backgroundColor: 'orange'
        },
        {
          action: 'move',
          label: 'move',
          backgroundColor: 'red'
        },
        {
          action: 'jump',
          label: 'jump',
          backgroundColor: 'olive'
        }
      ],
      onButtonClick: action('transition'),
      buttonsDisabled: true
    };

    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <TaskTransitions {...props} />
        </Paper>
      </div>
    );
  });
