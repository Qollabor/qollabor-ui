import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../reducers';

const defaultState = Immutable.fromJS(
  {
    isFetching: false,
    taskDetails: {},
    error: {
      message: '',
      isError: false
    },

    transition: {
      onGoing: false,
      error: {
        message: '',
        isError: false
      }
    }
  }
);

describe('features/task/reducers', () => {
  describe('When the reducer starts', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'TASK:WRONG', taskName: 'wrongTask' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('TASK:FETCH', () => {
    describe('When the fetch start action is issued', () => {
      let state;

      before(() => {
        state = reducers(defaultState, { type: 'TASK:FETCH' }).toJS();
      });

      it('isFetching should be true', () => {
        expect(state.isFetching)
          .to.be.eql(true);
      });

      it('error should be reset to the default value', () => {
        expect(state.error)
          .to.be.eql(defaultState.toJS().error);
      });
    });

    describe('TASK:FETCH:SUCCESS', () => {
      describe('When the fetch succes action is issued', () => {
        let state;
        const taskDetails = {
          caseDefinition: 'TravelRequest',
          caseId: 'fc849697_0b63_4b41_a582_746568bdd848',
          taskName: 'Approve Request',
          rootCase: 'fc849697_0b63_4b41_a582_746568bdd848',
          id: '1888e850_4f27_4397_a08a_26de3749b13b',
          lastModified: '2016-04-17T19:50:25.598438667Z'
        };

        before(() => {
          state = reducers(defaultState, { type: 'TASK:FETCH:SUCCESS', taskDetails }).toJS();
        });

        it('isFetching should be false', () => {
          expect(state.isFetching)
            .to.be.eql(false);
        });

        it('items should be set with the taskDetails passed', () => {
          expect(state.taskDetails)
            .to.be.eql(taskDetails);
        });

        it('error should be reset to the default value', () => {
          expect(state.error)
            .to.be.eql(defaultState.toJS().error);
        });
      });
    });

    describe('TASKS:FETCH:FAIL', () => {
      describe('When the fetch fail action is issued', () => {
        const error = 'Something bad happened';
        let state;

        before(() => {
          state = reducers(defaultState, { type: 'TASK:FETCH:FAIL', error }).toJS();
        });

        it('isFetching should be false', () => {
          expect(state.isFetching)
            .to.be.eql(false);
        });

        it('items should be equal to the default items', () => {
          expect(state.taskDetails)
            .to.be.eql(defaultState.toJS().taskDetails);
        });


        it('error should be set with the provided message', () => {
          expect(state.error.message)
            .to.be.eql(error);
        });

        it('error should be set with the isError flag as true', () => {
          expect(state.error.isError)
            .to.be.eql(true);
        });
      });
    });
  });
});
