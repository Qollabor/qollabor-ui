/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { fetchCase } from '../sagas';
import helpers from '../../../services/helpers';

describe('features/case/sagas', () => {
  describe('fetchCase', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';
    const caseId = 'x-files';
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
              })
          };
        }
      };

      requestSpy = sinon.spy();
      registry.register('request', {
        get: requestSpy
      });
      registry.register('store', fakeStore);
      registry.register('helpers', helpers);
      registry.register('config', {
        login: {
          token: {
            httpHeader: fakeTokenPropertyName
          }
        },
        cases: {
          url: fakeURL,
          version: 2,
          lastModifiedHttpHeader: 'something'
        }
      });
    });

    describe('when is invoked without caseId', () => {
      before(() => {
        generator = fetchCase();
      });

      it('should signal error', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ITEM:FETCH:FAIL', error: 'Must specify a caseId to fetch' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ACTIVE_TASKS:FETCH:FAIL', error: 'Must specify a caseId to fetch' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:COMPLETED_TASKS:FETCH:FAIL', error: 'Must specify a caseId to fetch' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ATTACHMENTS:FETCH:FAIL', error: 'Must specify a caseId to fetch' }));
      });
    });

    describe('when is invoked with a caseId', () => {
      beforeEach(() => {
        generator = fetchCase({ caseId });
      });

      it('should signal CASE:FETCH:* after it is invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ITEM:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ACTIVE_TASKS:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:COMPLETED_TASKS:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ATTACHMENTS:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();
        generator.next();
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${caseId}`, null, {
          headers: {
            [fakeTokenPropertyName]: fakeToken
          }
        })).to.be.true;
      });
    });

    describe('when is invoked with a caseId and with the caseLastModified parameter', () => {
      beforeEach(() => {
        generator = fetchCase({ caseId, caseLastModified });
      });

      it('should signal CASE:FETCH:* after it is invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ITEM:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ACTIVE_TASKS:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:COMPLETED_TASKS:FETCH' }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ATTACHMENTS:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();
        generator.next();
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${caseId}`, null, {
          headers: {
            [fakeTokenPropertyName]: fakeToken,
            something: caseLastModified
          }
        })).to.be.true;
      });
    });

    describe('when there is an error', () => {
      before(() => {
        generator = fetchCase({ caseId });
      });

      it('should signal CASE:FETCH:FAIL:*', () => {
        const message = 'Fake error message';

        generator.next();
        generator.next();
        generator.next();
        generator.next();
        generator.next();

        expect(generator.throw({ message }).value)
          .to.be.eql(put({ type: 'CASE:ITEM:FETCH:FAIL', error: message }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ACTIVE_TASKS:FETCH:FAIL', error: message }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:COMPLETED_TASKS:FETCH:FAIL', error: message }));

        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:ATTACHMENTS:FETCH:FAIL', error: message }));
      });
    });
  });
});
