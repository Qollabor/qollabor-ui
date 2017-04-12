import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TitledListBox } from './index';

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

storiesOf('components/titledListBox', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('with a list of items', () => {
    const title = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledListBox
          title={title}
          items={sampleItemList}
          labelField="taskName"
        />
      </div>
    );
  })
  .add('with no items', () => {
    const title = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledListBox
          title={title}
          items={[]}
          labelField="taskName"
          emptyListMessage="No items in the list"
        />
      </div>
    );
  });
