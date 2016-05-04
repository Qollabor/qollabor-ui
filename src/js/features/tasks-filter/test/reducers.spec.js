import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../reducers';

const defaultState = Immutable.Map({
  currentTasksFilter: 'myTasks',
  tasksFilterTypes: [
    {
      id: 'myTasks',
      icon: 'view_list',
      label: 'My Tasks',
      color: '#FFEB3B'
    },
    {
      id: 'dueDate',
      icon: 'query_builder',
      label: 'Due Date',
      color: '#FFEB3B'
    },
    {
      id: 'completed',
      icon: 'check',
      label: 'Completed',
      color: '#004D40'
    },
    {
      id: 'terminated',
      icon: 'clear',
      label: 'Terminated',
      color: '#E53935'
    }
  ]
});

describe('features/taskfilter', () => {
  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(
        reducers(defaultState, { type: 'TASKS_FILTER:WRONG', tasksFilterName: 'wrongTasksFilter' }).toJSON()
      ).to.eql(defaultState.toJSON());
    });
  });

  describe('TASKS_FILTER:CHANGE', () => {
    describe('When the tasksFilter starts', () => {
      it('should return the default state', () => {
        expect(
          reducers(undefined, {}).toJSON()
        ).to.eql(defaultState.toJSON());
      });
    });

    describe('When the user chooses an existing tasksFilter', () => {
      it('should have the correct currentTasksFilter', () => {
        expect(
          reducers(defaultState, { type: 'TASKS_FILTER:CHANGE', tasksFilterName: 'dueDate' }).toJSON()
        ).to.eql(defaultState.set('currentTasksFilter', 'dueDate').toJSON());
      });
    });
  });
});
