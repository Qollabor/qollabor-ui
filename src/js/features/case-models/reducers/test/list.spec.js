import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers as caseModalReducer } from '../list';

describe('features/case-models', () => {
  const defaultState = Immutable.fromJS({
    isFetching: false,
    position: 0,
    filterString: '',
    items: [],
    error: {
      message: '',
      isError: false
    }
  });

  const models = [
    {
      definitions: 'leaverequest.xml',
      dimensions: 'leaverequest.xml',
      name: 'leaverequest'
    },
    {
      definitions: 'paxalert.xml',
      dimensions: 'paxalert.xml',
      name: 'paxalert'
    },
    {
      definitions: 'besluiten.xml',
      dimensions: 'besluiten.xml',
      name: 'besluiten'
    }
  ];

  let actualState = defaultState;
  describe('When case model request initialized', () => {
    it('should return the state after setting position and items to empty', () => {
      actualState = caseModalReducer(undefined, {
        type: 'CASEMODEL:LIST:REQUEST_INIT'
      });

      expect(actualState.toJSON()).to.eql(defaultState.toJSON());
    });
  });

  describe('When case model list on fetch', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(), { isFetching: true }));

    it('should return the state after setting isFetching', () => {
      actualState = caseModalReducer(actualState, {
        type: 'CASEMODEL:LIST:FETCH'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });


  describe('When case model list on fetch success', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        isFetching: false,
        items: models
      }));

    it('should return the model list with name', () => {
      actualState = caseModalReducer(actualState, {
        type: 'CASEMODEL:LIST:FETCH:SUCCESS',
        items: models
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When case model list on fetch fail', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        error: { message: 'Internal Server Error', isError: true }
      }));

    it('should return the state with error message', () => {
      actualState = caseModalReducer(defaultState, {
        type: 'CASEMODEL:LIST:FETCH:FAIL',
        error: 'Internal Server Error'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });
});

