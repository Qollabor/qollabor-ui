import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../userSelector';

const defaultState = Immutable.fromJS({
  isFetching: false,
  filterString: undefined,
  USERS_SELECTOR: [],
  filterUSERS_SELECTOR: [],
  error: {
    message: '',
    isError: false
  },
  users: []
});

const users = [
  {
    userName: 'dannyk',
    fullName: 'Danny Kruitbosch'
  },
  {
    userName: 'martijnvdp',
    fullName: 'Martijn van der Plaat'
  },
  {
    userName: 'thijsp',
    fullName: 'Thijs Petter'
  }
];

describe('features/case-models/userSelector', () => {
  let actualState = defaultState;
  describe('When user selector initialized', () => {
    it('should return the state after setting users to empty', () => {
      actualState = reducers(undefined, {
        type: 'USERS_SELECTOR:LIST:REQUEST:INIT'
      });

      expect(actualState.toJSON()).to.eql(defaultState.toJSON());
    });
  });

  describe('When user selector on fetch', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(), { isFetching: true }));

    it('should return the state after setting isFetching', () => {
      actualState = reducers(actualState, {
        type: 'USERS_SELECTOR:LIST:FETCH'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });


  describe('When user selector on fetch success', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        isFetching: false,
        users
      }));

    it('should return the user list', () => {
      actualState = reducers(actualState, {
        type: 'USERS_SELECTOR:LIST:FETCH:SUCCESS',
        items: users
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When user selector on fetch fail', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        error: { message: 'Internal Server Error', isError: true }
      }));

    it('should return the state with error message', () => {
      actualState = reducers(defaultState, {
        type: 'USERS_SELECTOR:LIST:FETCH:FAIL',
        error: 'Internal Server Error'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });
});

