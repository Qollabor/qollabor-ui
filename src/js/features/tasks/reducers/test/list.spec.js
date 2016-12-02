/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../list';

const defaultState = Immutable.Map({
  isFetching: false,
  items: Immutable.fromJS([]),
  sortKey: 'dueDate',
  sortDesc: true,
  error: Immutable.Map({
    message: '',
    isError: false
  }),
  taskAction: {
    onGoing: false,
    error: {
      message: '',
      isError: false
    }
  }
});

describe('features/tasks/reducers/list', () => {
  describe('When the reducer starts', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'TASKS:FILTERS:WRONG', tasksFilterName: 'wrongTasksFilter' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('TASKS:LIST:FETCH', () => {
    describe('When the fetch start action is issued', () => {
      let state;

      beforeEach(() => {
        state = reducers(defaultState, { type: 'TASKS:LIST:FETCH' }).toJS();
      });

      it('isFetching should be true', () => {
        expect(state.isFetching)
          .to.be.true;
      });

      it('error should be reset to the default value', () => {
        expect(state.error)
          .to.be.eql(defaultState.toJS().error);
      });
    });
  });

  describe('TASKS:LIST:FETCH:SUCCESS', () => {
    describe('When the fetch success action is issued', () => {
      const tasks = [{ a: 1, b: 2, c: 3 }];

      let state;

      beforeEach(() => {
        state = reducers(defaultState, { type: 'TASKS:LIST:FETCH:SUCCESS', tasks }).toJS();
      });

      it('isFetching should be false', () => {
        expect(state.isFetching)
          .to.be.false;
      });

      it('items should be set with the tasks passed', () => {
        expect(state.items)
          .to.be.eql(tasks);
      });


      it('error should be reset to the default value', () => {
        expect(state.error)
          .to.be.eql(defaultState.toJS().error);
      });
    });
  });

  describe('TASKS:LIST:FETCH:FAIL', () => {
    describe('When the fetch fail action is issued', () => {
      const error = 'Something bad happened';

      let state;

      beforeEach(() => {
        state = reducers(defaultState, { type: 'TASKS:LIST:FETCH:FAIL', error }).toJS();
      });

      it('isFetching should be false', () => {
        expect(state.isFetching)
          .to.be.false;
      });

      it('items should be equal to the default items', () => {
        expect(state.items)
          .to.be.eql(defaultState.toJS().items);
      });


      it('error should be set with the provided message', () => {
        expect(state.error.message)
          .to.be.eql(error);
      });

      it('error should be set with the isError flag as true', () => {
        expect(state.error.isError)
          .to.be.true;
      });
    });
  });
});
