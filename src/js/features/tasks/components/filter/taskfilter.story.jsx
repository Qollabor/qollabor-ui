import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TasksFilter from './component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let currentTasksFilterId;
const onChangeTasksFilter = function () {};

const types = [
  {
    id: 'myTasks',
    icon: 'view_list',
    label: 'My Tasks',
    color: '#388AC3',
    filter: ['assignee']
  },
  {
    id: 'dueDate',
    icon: 'query_builder',
    label: 'Due Date',
    color: '#F3974F',
    filter: ['due']
  },
  {
    id: 'completed',
    icon: 'done_all',
    label: 'Completed',
    color: '#82B75A',
    filter: ['completed']
  },
  {
    id: 'terminated',
    icon: 'clear',
    label: 'Terminated',
    color: '#919191',
    filter: ['terminated']
  },
  {
    id: 'groupTasks',
    icon: 'group',
    label: 'Group Tasks',
    color: '#ACCFEB',
    filter: []
  }
];

storiesOf('Tasks/Filter', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Default filter presentation', () => {
    currentTasksFilterId = 'myTasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TasksFilter
          currentTasksFilter={currentTasksFilterId}
          tasksFilterTypes={types}
          onChangeTasksFilter={onChangeTasksFilter}
        />
      </div>
    );
  })
  .add('Terminated filter selection', () => {
    currentTasksFilterId = 'terminated';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TasksFilter
          currentTasksFilter={currentTasksFilterId}
          tasksFilterTypes={types}
          onChangeTasksFilter={onChangeTasksFilter}
        />
      </div>
    );
  })
  .add('Completed filter selection', () => {
    currentTasksFilterId = 'completed';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TasksFilter
          currentTasksFilter={currentTasksFilterId}
          tasksFilterTypes={types}
          onChangeTasksFilter={onChangeTasksFilter}
        />
      </div>
    );
  });
