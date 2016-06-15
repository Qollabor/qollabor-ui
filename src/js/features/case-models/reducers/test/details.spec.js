import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../details';

describe('features/case-models/details', () => {
  const defaultState = Immutable.fromJS({
    isFetching: false,
    data: {},
    definition: undefined,
    name: undefined,
    showFeedbackForm: false,
    error: {
      message: '',
      isError: false
    },
    actionError: {
      message: '',
      isError: false
    }
  });

  const modelDefinition = 'besluiten.xml';
  const modelName = 'besluiten';

  const responseItem = [{
    name: 'case',
    attributes: {
      description: 'Besluiten',
      id: 'besluiten.case_besluiten',
      name: 'besluiten'
    }
  }];

  const item = {
    description: 'Besluiten',
    id: 'besluiten.case_besluiten',
    name: 'besluiten'
  };

  let actualState = defaultState;
  describe('When case model details request initialized', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        definition: modelDefinition,
        name: modelName
      }));

    it('should return the state after setting items to empty', () => {
      actualState = reducers(undefined, {
        type: 'CASEMODEL:DETAIL:INIT',
        definition: modelDefinition,
        name: modelName
      });

      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When case model details on fetch', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        isFetching: true,
        definition: modelDefinition,
        name: modelName
      }));

    it('should return the state after setting isFetching', () => {
      actualState = reducers(actualState, {
        type: 'CASEMODEL:DETAIL:FETCH'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });


  describe('When case model details on fetch success', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        isFetching: false,
        data: item,
        definition: 'besluiten.xml',
        name: 'besluiten'
      }));

    it('should return the case model details', () => {
      actualState = reducers(actualState, {
        type: 'CASEMODEL:DETAIL:FETCH:SUCCESS',
        data: responseItem
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When case model detail on fetch fail', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        error: { message: 'Internal Server Error', isError: true }
      }));

    it('should return the state with error message', () => {
      actualState = reducers(defaultState, {
        type: 'CASEMODEL:DETAIL:FETCH:FAIL',
        error: 'Internal Server Error'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });
});

