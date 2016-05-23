import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

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
