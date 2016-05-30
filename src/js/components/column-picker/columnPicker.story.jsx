import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import ColumnPicker from './columnPicker';

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
  .add('Column Picker', () =>
    (<div className="center-component">
      <ColumnPicker columns={columns} onMenuItemClicked={action('toggle-column-visibility')}/>
    </div>));
