import { expect } from 'chai';

import { calcTaskStatus } from '../calcTaskStatus';

describe('features/tasks/helpers/calcTaskStatus', () => {
  describe('When the planState is Completed', () => {
    it('Should return a complete state', () => {
      const task = {
        planState: 'Completed'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('COMPLETED');
    });
  });

  describe('When the planState is Terminated', () => {
    it('Should return a terminate state', () => {
      const task = {
        planState: 'Terminated'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('TERMINATED');
    });
  });

  describe('When the planState is Completed and the dueDate is in the past', () => {
    it('Should return a completed state', () => {
      const task = {
        planState: 'Completed',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('COMPLETED');
    });
  });

  describe('When the planState is Terminated and the dueDate is in the past', () => {
    it('Should return a terminated state', () => {
      const task = {
        planState: 'Terminated',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('TERMINATED');
    });
  });

  describe('When the planState is not Terminated and not Completed and the dueDate is in the past', () => {
    it('Should return a due state', () => {
      const task = {
        planState: 'Active',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('DUE');
    });
  });

  describe('When the planState is not Terminated and not Completed and the dueDate is in the future', () => {
    it('Should return an Active state', () => {
      const task = {
        planState: 'Active',
        dueDate: '3015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('ACTIVE');
    });
  });
});
