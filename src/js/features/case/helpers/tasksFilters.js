export const activeTasksFilter = (task) => task.currentState === 'Active';

export const completedTasksFilter = (task) => task.currentState === 'Completed';
