import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../reducers';

const defaultState = Immutable.fromJS(
  {
    loggedUser: null,
    hidePasswordForm: false,
    error: {
      message: '',
      isError: false
    },
    profile: null
  }
);

describe('features/user/reducers', () => {
  describe('When the reducer starts', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'USER:SET_LOGGED_USER:WRONG', user: 'wrongUser' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  let actualState = defaultState;
  describe('When user password change request initialized', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        hidePasswordForm: false
      }));

    it('should return the state after setting hidePasswordForm to false', () => {
      actualState = reducers(undefined, {
        type: 'USER:CHANGE_PASSWORD:INIT',
        hidePasswordForm: false
      });

      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When user password on change', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        oldPassword: 'test',
        newPassword: 'test1'
      }));

    it('should return the state after setting old password and new password', () => {
      actualState = reducers(actualState, {
        type: 'USER:CHANGE_PASSWORD',
        oldPassword: 'test',
        newPassword: 'test1'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When user password on change success', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        hidePasswordForm: true,
        oldPassword: 'test',
        newPassword: 'test1'
      }));

    it('should return the state after setting hidePasswordForm to true', () => {
      actualState = reducers(actualState, {
        type: 'USER:CHANGE_PASSWORD:SUCCESS',
        oldPassword: 'test',
        newPassword: 'test1',
        hidePasswordForm: true
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When user password on change fail', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        error: { message: 'Internal Server Error', isError: true }
      }));

    it('should return the state with error message', () => {
      actualState = reducers(defaultState, {
        type: 'USER:CHANGE_PASSWORD:FAIL',
        error: 'Internal Server Error'
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });
});
