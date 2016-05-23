/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { planDiscretionaryItem } from '../sagas';
import { notifySuccess, notifyDanger } from '../../notifier';

import helpers from '../../../services/helpers';

describe('features/case/sagas', () => {
  describe('planDiscretionaryItem', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';
    const caseId = 'x-files';

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
        post: requestSpy
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
          version: 2,
          lastModifiedHttpHeader: 'lastModifiedHttpHeader'
        }
      });
    });

    describe('when is invoked without caseId', () => {
      before(() => {
        generator = planDiscretionaryItem();
      });

      it('should signal error', () => {
        expect(generator.next().value)
          .to.be.eql(
          put({
            type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL',
            error: 'Must specify a plan item id for the discretionary item to plan'
          }));
      });
    });

    describe('when is invoked with a caseId, planItemId and planItemName', () => {
      const planItemId = 'id';
      const planItemName = 'name';
      const fakeResponse = {
        headers: {
          get: () => 42
        }
      };

      beforeEach(() => {
        generator = planDiscretionaryItem({ caseId, planItemId, planItemName });
      });

      it('should signal CASE:DISCRECTIONARY_ITEMS:FETCH after it is invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN' }));
      });

      it('should invoke request.post with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${caseId}/discretionaryitems/plan`, { planItemId }, {
          headers: {
            [fakeTokenPropertyName]: fakeToken
          }
        })).to.be.true;
      });

      it('should notify success message', () => {
        generator.next();
        generator.next();
        expect(generator.next(fakeResponse).value)
          .to.be.eql(put(notifySuccess(`Discretionary item ['${planItemName}'] has been planned`)));
      });

      it('should signal success', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:SUCCESS' }));
      });

      it('should request case init with Case-Last-Modified header', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        generator.next();
        expect(generator.next().value)
          .to.be.eql(put({ type: 'CASE:REQUEST_INIT', caseId, caseLastModified: 42 }));
      });
    });

    describe('when there is an error', () => {
      const planItemId = 'id';
      const planItemName = 'name';

      beforeEach(() => {
        generator = planDiscretionaryItem({ caseId, planItemId, planItemName });
      });

      it('should signal CASE:DISCRETIONARY_ITEMS:PLAN:FAIL', () => {
        const message = 'Fake error message';

        generator.next();

        expect(generator.throw({ message }).value)
          .to.be.eql(put({ type: 'CASE:DISCRETIONARY_ITEMS:PLAN:FAIL', error: message }));
      });

      it('should notify danger message', () => {
        const message = 'Fake error message';

        generator.next();

        generator.throw({ message });
        expect(generator.next().value)
          .to.be.eql(put(notifyDanger(`Error while planning discretionary item ['${planItemName}']`)));
      });
    });
  });
});
