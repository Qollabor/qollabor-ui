export const generateRequestFilters = (filters, args) =>
  filters.map((filter) => {
    switch (filter) {
      case 'myTasks':
        return { assignee: args.userId, planState: 'Active' };
      case 'due':
        return { dueBefore: args.today, planState: 'Active' };
      case 'completed':
        return { planState: 'Completed' };
      case 'terminated':
        return { planState: 'Terminated' };
      case 'unassigned':
        return { taskState: 'Unassigned' };
      default:
        throw new Error(`Unsupported filter ${filter}`);
    }
  }).reduce((accumulator, value) => Object.assign(accumulator, value), {});
