import React from 'react';

import { TaskList } from '../tasks-list';

export class TaskListLayout extends React.Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <div>
          <TaskList />
        </div>
      </div>
    );
  }
}

TaskListLayout.displayName = 'TaskListLayout';

export default TaskListLayout;
