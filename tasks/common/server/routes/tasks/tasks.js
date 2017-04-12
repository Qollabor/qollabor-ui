const originalData = require('./data/tasks');
const constant = require('./const');

let currentData = originalData.map(task => Object.assign({}, task));

const doComplete = (idTask) => {
  currentData = currentData.map((task) => {
    if (task.id === idTask) {
      return Object.assign({}, task, { planState: constant.PLAN_STATES_COMPLETED });
    }
    return task;
  });
};

const doTerminate = (idTask) => {
  currentData = currentData.map((task) => {
    if (task.id === idTask) {
      return Object.assign({}, task, { planState: constant.PLAN_STATES_TERMINATED });
    }
    return task;
  });
};

const doSuspend = (idTask) => {
  currentData = currentData.map((task) => {
    if (task.id === idTask) {
      return Object.assign({}, task, { planState: constant.PLAN_STATES_SUSPENDED });
    }
    return task;
  });
};

const doResume = (idTask) => {
  currentData = currentData.map((task) => {
    if (task.id === idTask) {
      return Object.assign({}, task, { planState: constant.PLAN_STATES_ACTIVE });
    }
    return task;
  });
};

module.exports = {
  getTasks: () => currentData,
  getTask: id => currentData.find(item => item.id === id),
  doComplete,
  doTerminate,
  doSuspend,
  doResume,
  addTask: item => currentData.push(item),
  reset: () => {
    currentData = originalData.map(task => Object.assign({}, task));
  }
};
