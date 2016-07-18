import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../caseTeam';

const defaultState = Immutable.fromJS(
  {
    roles: Immutable.Map(),
    user: null,
    isSelected: null
  });

const caseItemRoles = ['ADMIN', 'Manager', 'Reviewer'];

describe('features/case-models/caseTeam', () => {
  describe('When the reducer starts', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'CASETEAM_SELECTOR:SETROLES:WRONG', roles: 'wrongRoles' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  let actualState = defaultState;
  describe('When case team roles are set', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        roles: {
          ADMIN: [],
          Manager: [],
          Reviewer: []
        }
      }));

    it('should return the state after setting case team roles', () => {
      actualState = reducers(undefined, {
        type: 'CASETEAM_SELECTOR:SETROLES',
        roles: caseItemRoles
      });

      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });

  describe('When case team members are assigned to role', () => {
    const expectedState = Immutable.fromJS(Object.assign(defaultState.toJSON(),
      {
        roles: {
          ADMIN: [
            {
              name: 'admin',
              uniqueId: 'admin'
            }
          ],
          Manager: [],
          Reviewer: []
        },
        selectedUser: {
          name: 'admin',
          uniqueId: 'admin'
        },
        isSelected: true
      }));

    it('should return the team members after assigning the role', () => {
      actualState = reducers(actualState, {
        type: 'CASETEAM_SELECTOR:SETUSERSFORROLE',
        role: 'ADMIN',
        user: {
          name: 'admin',
          uniqueId: 'admin'
        },
        selected: true
      });
      expect(actualState.toJSON()).to.eql(expectedState.toJSON());
    });
  });
});

