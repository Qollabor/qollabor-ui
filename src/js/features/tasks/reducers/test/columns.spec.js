import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../columns';

const defaultState = Immutable.fromJS([
  {
    label: 'Assigned to',
    key: 'assignee',
    visible: true
  },
  {
    label: 'Name',
    key: 'taskName',
    visible: true
  },
  {
    label: 'Case',
    key: 'caseDefinition',
    visible: true
  },
  {
    label: 'Due date',
    key: 'dueBefore',
    visible: true
  }
]);

describe('features/tasks/reducers/columns', () => {
  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'TASKS:COLUMNS:WRONG', columnName: 'notExisting' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('TASKS:COLUMNS:TOGGLE_VISIBILITY', () => {
    describe('When the tasksFilter starts', () => {
      it('should return the default state', () => {
        expect(reducers(defaultState, {}).toJS())
          .to.eql(defaultState.toJS());
      });
    });

    describe('When the user toggles an existing column', () => {
      it('the correspondent visibility should toggle correctly', () => {
        expect(reducers(defaultState, { type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: 'assignee' }).toJS()[0])
          .to.eql(
          {
            label: 'Assigned to',
            key: 'assignee',
            visible: false
          }
        );
      });
    });

    describe('When the user toggles an existing column twice', () => {
      it('the correspondent visibility should be set back to the initial state', () => {
        expect(
          reducers(
            reducers(defaultState, { type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: 'assignee' }),
            { type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: 'assignee' })
            .toJS()[0])
          .to.eql(defaultState.toJS()[0]);
      });
    });

    describe('When the user toggles a non existing column', () => {
      it('an error should be thrown', () => {
        expect(reducers.bind(defaultState, { type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: 'notExisting' }))
          .to.Throw();
      });
    });

    describe('When there is only one visible column', () => {
      it('should not be possibile to hide it', () => {
        const initialState = Immutable.fromJS([
          {
            label: 'Assigned to',
            key: 'assignee',
            visible: true
          }]);

        expect(reducers(initialState, { type: 'TASKS:COLUMNS:TOGGLE_VISIBILITY', columnName: 'assignee' }).toJS())
          .to.be.eql(initialState.toJS());
      });
    });
  });
});
