import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TaskList from './component';

const callBack = function() {};
const taskListActive = [
  {
    id: 'myTaskId01',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'view_list',
    taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
    color: '#388AC3'
  },
  {
    id: 'myTaskId02',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'query_builder',
    taskName: 'Add information to request',
    color: '#F3974F'
  }
];
const taskListNoTasks = [];

const taskListCompleted = [
  {
    id: 'myTaskId01',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'view_list',
    taskName: 'Travel request intake',
    color: '#388AC3'
  },
  {
    id: 'myTaskId02',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'query_builder',
    taskName: 'Approve request',
    color: '#F3974F'
  },
  {
    id: 'myTaskId03',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'done_all',
    taskName: 'Book travel',
    color: '#82B75A'
  }
];


storiesOf('Task/Tasklist', module)
  .add('Tasklist with active tasks', () => {
    const taskListTitle = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TaskList
          title={taskListTitle}
          taskList={taskListActive}
          onClickTaskListItem={callBack}
        />
      </div>
    );
  })
  .add('Tasklist with completed tasks', () => {
    const taskListTitle = 'Completed tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TaskList
          title={taskListTitle}
          taskList={taskListCompleted}
          onClickTaskListItem={callBack}
        />
      </div>
    );
  })
  .add('Active Tasklist with no tasks', () => {
    const taskListTitle = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TaskList
          title={taskListTitle}
          taskList={taskListNoTasks}
          onClickTaskListItem={callBack}
        />
      </div>
    );
  });
