import { expect } from 'chai';

import { generateRequestFilters } from '../generateRequestFilters';

describe('helpers/tasks/generateRequestFilters', () => {
  const args = { userId: 'admin', today: 1 };

  it('should throw an error for an unrecognized filter', () => {
    expect(generateRequestFilters.bind(null, ['unknown'], args))
      .to.Throw();
  });

  it('should generate the correct "myTasks" filter', () => {
    expect(generateRequestFilters(['myTasks'], args))
      .to.be.eql({ assignee: args.userId, planState: 'Active' });
  });

  it('should generate the correct "dueDate" filter', () => {
    expect(generateRequestFilters(['due'], args))
      .to.be.eql({ dueBefore: args.today, planState: 'Active' });
  });

  it('should generate the correct "completed" filter', () => {
    expect(generateRequestFilters(['completed'], args))
      .to.be.eql({ planState: 'Completed' });
  });

  it('should generate the correct "terminated" filter', () => {
    expect(generateRequestFilters(['terminated'], args))
      .to.be.eql({ planState: 'Terminated' });
  });

  it('should generate the correct ["unassigned", "myTasks"] filter', () => {
    expect(generateRequestFilters(['unassigned', 'myTasks'], args))
      .to.be.eql({ planState: 'Active', assignee: args.userId, taskState: 'Unassigned' });
  });
});
