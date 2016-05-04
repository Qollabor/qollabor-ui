import React from 'react';
import { storiesOf } from '@kadira/storybook';
import TasksFilter from './component';
import { defaultState as tasksFilterTypes } from './reducers';

let currentTasksFilterId;
const onChangeTasksFilter = function() {};

storiesOf('TasksFilter', module)
  .add('Default filter presentation', () => {
    currentTasksFilterId = tasksFilterTypes.get('currentTasksFilter');
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={tasksFilterTypes.get('tasksFilterTypes').toJS()}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  })
  .add('Terminated filter selection', () => {
    currentTasksFilterId = 'terminated';
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={tasksFilterTypes.get('tasksFilterTypes').toJS()}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  })
  .add('Completed filter selection', () => {
    currentTasksFilterId = 'completed';
    return (
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={tasksFilterTypes.get('tasksFilterTypes').toJS()}
        onChangeTasksFilter={onChangeTasksFilter}
      />
    );
  });
