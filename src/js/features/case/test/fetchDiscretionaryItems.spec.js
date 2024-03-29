/* eslint-disable no-unused-expressions */
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { fetchDiscretionaryItems } from '../sagas';

import helpers from '../../../helpers';

describe('features/case/sagas', () => {
  describe('fetchDiscretionaryItems', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';
    const caseId = 'x-files';
    const caseLastModifiedPropertyName = 'Case-Last-Modified';
    const caseLastModified = 42;

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
        generator = fetchDiscretionaryItems();
      });

      it('should signal error', () => {
        expect(generator.next().value)
          .toEqual(
          put({
            type: 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL',
            error: 'Must specify a caseId for the discretionary items to fetch'
          }));
      });
    });

    describe('when is invoked with a caseId', () => {
      beforeEach(() => {
        generator = fetchDiscretionaryItems({ caseId });
      });

      it('should signal CASE:DISCRETIONARY_ITEMS:FETCH after it is invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${caseId}/discretionaryitems`, null, {
          headers: {
            [fakeTokenPropertyName]: fakeToken,
            [caseLastModifiedPropertyName]: caseLastModified
          }
        })).toBeTruthy;
      });
    });

    describe('when there is an error', () => {
      beforeEach(() => {
        generator = fetchDiscretionaryItems({ caseId });
      });

      it('should signal CASE:DISCRETIONARY_ITEMS:FAIL', () => {
        const message = 'Fake error message';

        generator.next();

        expect(generator.throw({ message }).value)
          .toEqual(put({ type: 'CASE:DISCRETIONARY_ITEMS:FETCH:FAIL', error: message }));
      });
    });
  });
});
