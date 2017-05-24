/* eslint-disable no-unused-expressions */
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { fetchCaseTeam } from '../sagas';

import helpers from '../../../helpers';

describe('features/case/sagas', () => {
  describe('fetchCaseTeam', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';
    const caseLastModifiedPropertyName = 'Case-Last-Modified';
    const caseLastModified = 42;
    const user1 = 'wilbur';
    const user2 = 'dasher';
    const caseTeam = [
      {
        roles: [],
        user: user1
      },
      {
        roles: [],
        user: user2
      }
    ];

    let requestSpy;
    let generator;

    beforeEach(() => {
      registry.reset();

      const fakeStore = {
        getState () {
          return {
            user: Immutable.fromJS(
              {
                loggedUser: {
                  token: fakeToken,
                  username: 'admin'
                }
              }),
            app: Immutable.fromJS(
              {
                caseLastModified
              })
          };
        }
      };

      requestSpy = sinon.spy();
      registry.register('request', {
        get: requestSpy
      });
      registry.register('helpers', helpers);
      registry.register('store', fakeStore);
      registry.register('config', {
        login: {
          token: {
            httpHeader: fakeTokenPropertyName
          }
        },
        cases: {
          url: fakeURL,
          version: 2
        }
      });
    });

    describe('when is invoked without caseId', () => {
      beforeEach(() => {
        generator = fetchCaseTeam();
      });

      it('should signal error', () => {
        expect(generator.next().value)
          .toEqual(
          put({
            type: 'CASE:TEAM:FETCH:FAIL',
            error: 'Must specify a caseTeam for the caseTeam items to fetch'
          }));
      });
    });

    describe('when is invoked with a caseTeam', () => {
      beforeEach(() => {
        generator = fetchCaseTeam({ caseTeam });
      });

      it('should signal CASE:TEAM:FETCH after it is invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'CASE:TEAM:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}users?ids=${user1},${user2}`, null, {
          headers: {
            [fakeTokenPropertyName]: fakeToken,
            [caseLastModifiedPropertyName]: caseLastModified
          }
        })).toBeTruthy;
      });
    });

    describe('when there is an error', () => {
      beforeEach(() => {
        generator = fetchCaseTeam({ caseTeam });
      });

      it('should signal CASE:TEAM:FAIL', () => {
        const message = 'Fake error message';

        generator.next();

        expect(generator.throw({ message }).value)
          .toEqual(put({ type: 'CASE:TEAM:FETCH:FAIL', error: message }));
      });
    });
  });
});
