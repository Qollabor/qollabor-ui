import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import fakeData from './data.json';
import TaskList from './../components/tasks';

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

storiesOf('Tasks/List', module)
  .addDecorator(getStory => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('With some item to display auto body height', () =>
    (<div className="center-component">
      <TaskList
        onMount={action('mount')}
        isFetching={false}
        columns={columns}
        tasks={fakeData}
        onRowClick={action('row-click')}
        onColumnVisibilityToggle={action('toggle-column-visibility')}
      />
    </div>)
  )
  .add('With some item to display fixed body height', () =>
    (<div className="center-component">
      <TaskList
        onMount={action('mount')}
        isFetching={false}
        columns={columns}
        tasks={fakeData}
        onRowClick={action('row-click')}
        onColumnVisibilityToggle={action('toggle-column-visibility')}
        bodyHeight={300}
      />
    </div>)
  )
  .add('With nothing to display', () => {
    const data = [];

    return (
      <div className="center-component">
        <TaskList
          isFetching={false}
          columns={columns}
          tasks={data}
        />
      </div>
    );
  })
  .add('Error state', () => {
    const error = {
      message: 'Something happened :(',
      isError: true
    };

    return (
      <div className="center-component">
        <TaskList
          isFetching={false}
          columns={columns}
          error={error}
        />
      </div>
    );
  })
  .add('Is fetching something', () =>
    <div className="center-component">
      <TaskList columns={columns} isFetching={true} />
    </div>
  );
