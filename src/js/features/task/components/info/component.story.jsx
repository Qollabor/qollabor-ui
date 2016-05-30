import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { TaskInfo } from './index';

const taskDetails = {
  modifiedBy: 'moduser',
  caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
  rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
  dueDate: '2016-05-23T10:00:11.922Z',
  caseDefinition: 'SomeDefinition',
  createdOn: '2016-03-05T14:21:28.731Z',
  planState: 'Active',
  parentCaseInstanceId: null,
  taskState: 'Assigned',
  assignee: 'admin',
  taskName: 'Review documents',
  owner: 'admin',
  role: 'reviewers',
  id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0001',
  createdBy: 'creationuser',
  lastModified: '2016-03-08T09:44:32.345Z'
};

const taskDetailsEmpty = {};

storiesOf('Task/TaskInfo', module)
  .add('TaskInfo with data', () => (
    <div style={{ width: '300px', marginLeft: '100px' }}>
      <TaskInfo
        isFetching={false}
        error={{ isError: false, message: '' }}
        taskDetails={taskDetails}
      />
    </div>
  ))
  .add('TaskInfo without data', () => (
    <div style={{ width: '300px', marginLeft: '100px' }}>
      <TaskInfo
        taskDetails={taskDetailsEmpty}
      />
    </div>
  ));
