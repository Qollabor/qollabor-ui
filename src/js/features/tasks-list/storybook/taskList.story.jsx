import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import fakeData from './data.json';
import TaskList from './../components/taskList';
import TaskStatus from './../components/taskStatus';

const columns = [
  {
    label: 'My tasks',
    key: 'taskAssignedTo'
  },
  {
    label: 'Name',
    key: 'taskName'
  },
  {
    label: 'Case',
    key: 'taskCase'
  },
  {
    label: 'Due date',
    key: 'taskDueDate'
  }
];

storiesOf('Tasks/List', module)
  .add('With some item to display auto body height', () =>
    (<div className="center-component">
      <TaskList
        onMount={action('mount')}
        isFetching={false}
        columns={columns}
        tasks={fakeData}
        onRowClick={action('row-click')}
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
      <TaskList columns={columns} isFetching={true}/>
    </div>
  )
  .add('Status icons', () =>
    <div className="center-component">
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Completed</td>
            <td><TaskStatus status="COMPLETED"/></td>
          </tr>
          <tr>
            <td>Due</td>
            <td><TaskStatus status="DUE"/></td>
          </tr>
          <tr>
            <td>Terminated</td>
            <td><TaskStatus status="TERMINATED"/></td>
          </tr>
          <tr>
            <td>Empty</td>
            <td><TaskStatus status=""/></td>
          </tr>
          <tr>
            <td>Not set</td>
            <td><TaskStatus /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
