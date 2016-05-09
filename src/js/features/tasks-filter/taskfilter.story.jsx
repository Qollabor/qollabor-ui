import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TasksFilter from './component';

let currentTasksFilterId;
const onChangeTasksFilter = function() {};

const types = [
  {
    id: 'myTasks',
    icon: 'view_list',
    label: 'My Tasks',
    color: '#FFEB3B'
  },
  {
    id: 'dueDate',
    icon: 'query_builder',
    label: 'Due Date',
    color: '#FFEB3B'
  },
  {
    id: 'completed',
    icon: 'check',
    label: 'Completed',
    color: '#004D40'
  },
  {
    id: 'terminated',
    icon: 'clear',
    label: 'Terminated',
    color: '#E53935'
  }
];

storiesOf('Tasks/Filter', module)
  .add('Default filter presentation', () => {
    currentTasksFilterId = 'myTasks';
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={types}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  })
  .add('Terminated filter selection', () => {
    currentTasksFilterId = 'terminated';
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={types}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  })
  .add('Completed filter selection', () => {
    currentTasksFilterId = 'completed';
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={types}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  });
