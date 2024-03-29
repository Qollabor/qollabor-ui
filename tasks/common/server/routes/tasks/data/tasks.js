const moment = require('moment');
const constant = require('./../const');

const today = moment();

const yesterday = moment().subtract(1, 'day');
const twoDaysAgo = moment().subtract(2, 'day');
const oneWeekAgo = moment().subtract(7, 'day');
const tomorrow = moment().add(1, 'day');
const nearFuture = moment().add(10, 'day');
const future = moment().add(100, 'day');

const userOne = 'admin';
const userTwo = 'otherUser';

module.exports = [
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0001',
    taskName: 'Review documents',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: today,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0002',
    taskName: 'Switch Off',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    planState: constant.PLAN_STATES_TERMINATED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0003',
    taskName: 'Switch on',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    planState: constant.PLAN_STATES_COMPLETED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userTwo,
    owner: userTwo,
    dueDate: oneWeekAgo,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0004',
    taskName: 'Open door',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_COMPLETED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userTwo,
    owner: userTwo,
    dueDate: future,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0005',
    taskName: 'Close door',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: oneWeekAgo,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0006',
    taskName: 'Jump',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: nearFuture,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0007',
    taskName: 'Twist',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_SUSPENDED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: nearFuture,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0008',
    taskName: 'Run, run ,run',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: twoDaysAgo,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0009',
    taskName: 'Change direction',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_SUSPENDED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: yesterday,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0010',
    taskName: 'Fly above',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_TERMINATED,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0011',
    taskName: 'Fly below',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0012',
    taskName: 'Dance',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: constant.PLAN_STATES_ACTIVE,
    taskState: constant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: today,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  }
];
