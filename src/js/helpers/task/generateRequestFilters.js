export const generateRequestFilters = (filters, args) =>
  filters.map((filter) => {
    switch (filter) {
      case 'myTasks':
        return { assignee: args.userId };
      case 'due':
        return { dueBefore: args.today };
      case 'completed':
        return { planState: 'Completed' };
      case 'terminated':
        return { planState: 'Terminated' };
      default:
        throw new Error(`Unsupported filter ${filter}`);
    }
  }).reduce((accumulator, value) => Object.assign(accumulator, value), {});
