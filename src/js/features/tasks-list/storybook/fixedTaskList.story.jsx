import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import fakeData from './dataFixed.json';
import TaskListFixed from './../components/fixedTaskList';

const columns = [
  {
    label: 'Assignee',
    key: 'assignee',
    visible: true
  },
  {
    label: 'Task Name',
    key: 'taskName',
    visible: true
  },
  {
    label: 'Case ID',
    key: 'caseInstanceId',
    visible: true
  },
  {
    label: 'Due date',
    key: 'dueDate',
    visible: true
  }
];

storiesOf('feature Tasks/List', module)
  .add('With some item to display auto body height', () =>
    (<div className="center-component">
      <TaskListFixed
        onMount={action('mount')}
        isFetching={false}
        columns={columns}
        tasks={fakeData}
        onRowClick={action('row-click')}
      />
    </div>)
  )
  .add('With nothing to display', () => {
    const data = [];

    return (
      <div className="center-component">
        <TaskListFixed
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
        <TaskListFixed
          isFetching={false}
          columns={columns}
          error={error}
        />
      </div>
    );
  })
  .add('Is fetching something', () =>
    <div className="center-component">
      <TaskListFixed columns={columns} isFetching={true}/>
    </div>
  );
