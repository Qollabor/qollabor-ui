const moment = require('moment');
const taskConstant = require('./../../tasks/const');

const tomorrow = moment().add(1, 'day');

const userOne = 'admin';

module.exports = [
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996DD01',
    taskName: 'Discretionary 1',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: taskConstant.PLAN_STATES_ACTIVE,
    taskState: taskConstant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996DD02',
    taskName: 'Discretionary 2',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: taskConstant.PLAN_STATES_ACTIVE,
    taskState: taskConstant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996DD03',
    taskName: 'Discretionary 3',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: taskConstant.PLAN_STATES_ACTIVE,
    taskState: taskConstant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  },
  {
    id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996DD04',
    taskName: 'Discretionary 4',
    caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
    caseDefinition: 'SomeDefinition',
    role: 'reviewers',
    parentCaseInstanceId: null,
    rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
    planState: taskConstant.PLAN_STATES_ACTIVE,
    taskState: taskConstant.TASK_STATES_ASSIGNED,
    assignee: userOne,
    owner: userOne,
    dueDate: tomorrow,
    lastModified: new Date('2016-03-08T09:44:32.345Z'),
    modifiedBy: 'moduser',
    createdOn: new Date('2016-03-05T14:21:28.731Z'),
    createdBy: 'creationuser'
  }
];
