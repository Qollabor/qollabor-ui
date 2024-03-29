export const calcTaskStatus = (task) => {
  if (task.planState === 'Completed') {
    return 'COMPLETED';
  }
  if (task.planState === 'Terminated') {
    return 'TERMINATED';
  }
  if (task.dueDate && task.dueDate.substring(0, 10) < (new Date()).toISOString().substring(0, 10)) {
    return 'DUE';
  }
  return 'ACTIVE';
};
