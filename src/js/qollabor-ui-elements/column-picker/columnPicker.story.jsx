import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ColumnPicker from './index';

const columns = [
  {
    label: 'My tasks',
    key: 'taskAssignedTo',
    visible: true
  },
  {
    label: 'Name',
    key: 'taskName',
    visible: true
  },
  {
    label: 'Case',
    key: 'taskCase',
    visible: true
  },
  {
    label: 'Due date',
    key: 'taskDueDate',
    visible: true
  }
];

storiesOf('Column Picker', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Column Picker', () =>
    (<div className="center-component">
      <ColumnPicker columns={columns} onMenuItemClicked={action('toggle-column-visibility')} />
    </div>));
