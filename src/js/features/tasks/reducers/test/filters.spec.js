import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../filters';

const defaultState = Immutable.fromJS({
  currentTasksFilter: {
    id: 'myTasks',
    label: 'My Tasks',
    filter: ['assignee']
  },
  tasksFilterTypes: [
    {
      id: 'myTasks',
      icon: 'view_list',
      label: 'My Tasks',
      color: '#FFEB3B',
      filter: ['assignee']
    },
    {
      id: 'dueDate',
      icon: 'query_builder',
      label: 'Due Date',
      color: '#FFEB3B',
      filter: ['due']
    },
    {
      id: 'completed',
      icon: 'check',
      label: 'Completed',
      color: '#004D40',
      filter: ['completed']
    },
    {
      id: 'terminated',
      icon: 'clear',
      label: 'Terminated',
      color: '#E53935',
      filter: ['terminated']
    },
    {
      id: 'groupTask',
      icon: 'clear',
      label: 'Group Tasks',
      color: '#E53935',
      filter: []
    }
  ]
});

describe('features/tasks/reducers/filters', () => {
  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'TASKS:FILTERS:WRONG', tasksFilterName: 'wrongTasksFilter' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('TASKS:FILTERS:CHANGE', () => {
    describe('When the tasksFilter starts', () => {
      it('should return the default state', () => {
        expect(reducers(defaultState, {}).toJS())
          .to.eql(defaultState.toJS());
      });
    });

    describe('When the user chooses an existing tasksFilter', () => {
      it('should have the correct currentTasksFilter', () => {
        expect(reducers(defaultState, { type: 'TASKS:FILTERS:CHANGE', tasksFilterName: 'dueDate' }).toJS())
          .to.eql(
          defaultState.set('currentTasksFilter',
            Immutable.fromJS({
              id: 'dueDate',
              label: 'Due Date',
              filter: ['due']
            })).toJS());
      });
    });
  });
});
