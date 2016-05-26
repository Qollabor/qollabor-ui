import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TitledListBox from './index';

const taskListActive = [
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
const taskListNoTasks = [];

const taskListCompleted = [
  {
    id: 'myTaskId01',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'view_list',
    taskName: 'Travel request intake',
    color: '#388AC3',
    action: action('Intake')
  },
  {
    id: 'myTaskId02',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'query_builder',
    taskName: 'Approve request',
    color: '#F3974F',
    action: action('Approve Request')
  },
  {
    id: 'myTaskId03',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    icon: 'done_all',
    taskName: 'Book travel',
    color: '#82B75A',
    action: action('Book Travel')
  }
];

storiesOf('Task/Tasklist', module)
  .add('Tasklist with active tasks', () => {
    const taskListTitle = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledListBox
          title={taskListTitle}
          taskList={taskListActive}
        />
      </div>
    );
  })
  .add('Tasklist with completed tasks', () => {
    const taskListTitle = 'Completed tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledListBox
          title={taskListTitle}
          taskList={taskListCompleted}
        />
      </div>
    );
  })
  .add('Active Tasklist with no tasks', () => {
    const taskListTitle = 'Active tasks';
    return (
      <div style={{ width: '300px', marginLeft: '100px' }}>
        <TitledListBox
          title={taskListTitle}
          taskList={taskListNoTasks}
        />
      </div>
    );
  });
