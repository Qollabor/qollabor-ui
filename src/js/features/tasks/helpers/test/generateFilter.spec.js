import { expect } from 'chai';

import generatorFunction from '../generateFilter';

describe('features/tasks/helpers/generateFilter', () => {
  const args = { userId: 'admin', today: 1 };

  it('should throw an error for an unrecognized filter', () => {
    expect(generatorFunction.bind(null, ['unknown'], args))
      .to.Throw();
  });

  it('should generate the correct "myTasks" filter', () => {
    expect(generatorFunction(['myTasks'], args))
      .to.be.eql({ assignee: args.userId });
  });

  it('should generate the correct "dueDate" filter', () => {
    expect(generatorFunction(['due'], args))
      .to.be.eql({ dueBefore: args.today });
  });

  it('should generate the correct "completed" filter', () => {
    expect(generatorFunction(['completed'], args))
      .to.be.eql({ planState: 'Completed' });
  });

  it('should generate the correct "terminated" filter', () => {
    expect(generatorFunction(['terminated'], args))
      .to.be.eql({ planState: 'Terminated' });
  });

  it('should generate the correct ["terminated", "myTasks"] filter', () => {
    expect(generatorFunction(['terminated', 'myTasks'], args))
      .to.be.eql({ planState: 'Terminated', assignee: args.userId });
  });
});
