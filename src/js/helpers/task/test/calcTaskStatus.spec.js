import { expect } from 'chai';

import { calcTaskStatus } from '../calcTaskStatus';

describe('features/tasks/helpers/calcTaskStatus', () => {
  describe('When the currentState is Completed', () => {
    it('Should return a complete state', () => {
      const task = {
        currentState: 'Completed'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('COMPLETED');
    });
  });

  describe('When the currentState is Terminated', () => {
    it('Should return a terminate state', () => {
      const task = {
        currentState: 'Terminated'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('TERMINATED');
    });
  });

  describe('When the currentState is Completed and the dueDate is in the past', () => {
    it('Should return a completed state', () => {
      const task = {
        currentState: 'Completed',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('COMPLETED');
    });
  });

  describe('When the currentState is Terminated and the dueDate is in the past', () => {
    it('Should return a terminated state', () => {
      const task = {
        currentState: 'Terminated',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('TERMINATED');
    });
  });

  describe('When the currentState is not Terminated and not Completed and the dueDate is in the past', () => {
    it('Should return a due state', () => {
      const task = {
        currentState: 'Active',
        dueDate: '2015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('DUE');
    });
  });

  describe('When the currentState is not Terminated and not Completed and the dueDate is in the future', () => {
    it('Should return an Active state', () => {
      const task = {
        currentState: 'Active',
        dueDate: '3015-01-01'
      };
      expect(calcTaskStatus(task))
        .to.be.eql('ACTIVE');
    });
  });
});
