'use strict';

const tasksData = require('./data/tasks');

const constant = require('./const');
const dataKey = '_2';

let curTasksData = tasksData[dataKey].map(task => Object.assign({}, task));

const doComplete = (idTask) => {
  curTasksData = curTasksData.map(task => {
    if (task.id === idTask) {
      task.currentState = constant.PLAN_STATES_COMPLETED;
      return task;
    }
    return task;
  });
};

const doTerminate = (idTask) => {
  curTasksData = curTasksData.map(task => {
    if (task.id === idTask) {
      task.currentState = constant.PLAN_STATES_TERMINATED;
      return task;
    }
    return task;
  });
};

const doSuspend = (idTask) => {
  curTasksData = curTasksData.map(task => {
    if (task.id === idTask) {
      task.currentState = constant.PLAN_STATES_SUSPENDED;
      return task;
    }
    return task;
  });
};

const doResume = (idTask) => {
  curTasksData = curTasksData.map(task => {
    if (task.id === idTask) {
      task.currentState = constant.PLAN_STATES_ACTIVE;
      return task;
    }
    return task;
  });
};

module.exports = {
  getTasks: () => curTasksData,
  getTask: (id) => curTasksData.find(item => item.id === id),
  doComplete,
  doTerminate,
  doSuspend,
  doResume,
  addTask: (item) => curTasksData.push(item),
  reset: () => {
    curTasksData = tasksData[dataKey].map(task => Object.assign({}, task));
  }
};
