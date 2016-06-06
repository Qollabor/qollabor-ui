import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Paper } from 'material-ui';

import { DiscretionaryItems } from './component';

const sampleItemList = [
  {
    id: 'myTaskId01',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'view_list',
    taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
    color: '#388AC3',
    action: action('ActionLink')
  },
  {
    id: 'myTaskId02',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'query_builder',
    taskName: 'Add information to request',
    color: '#F3974F',
    url: 'some'
  }
];

storiesOf('Task/DiscretionaryItems', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('some items to show', () => {
    const title = 'Active tasks';
    return (
      <Paper style={{ width: '300px', marginLeft: '100px' }}>
        <DiscretionaryItems
          title={title}
          discretionaryItems={sampleItemList}
          labelField="taskName"
        />
      </Paper>
    );
  });
