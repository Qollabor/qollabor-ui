/* eslint-disable no-unused-expressions */

import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { raiseEvent } from '../sagas';
import { notifySuccess, notifyDanger } from '../../notifier';

describe('features/case/sagas', () => {
  describe('raiseEvent', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';

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

    describe('when is invoked without id', () => {
      beforeEach(() => {
        generator = raiseEvent();
      });

      it('should signal error', () => {
        expect(generator.next().value)
          .toEqual(
          put({
            type: 'CASE:PLAN_ITEM:RAISE_EVENT:FAIL',
            error: 'Must specify a case instance id, plan item id, plan item name to raise event'
          }));
      });
    });

    describe('when is invoked with a caseInstanceId and planItemId', () => {
      const planItemId = 'id';
      const planItemName = 'wilbur';
      const caseInstanceId = '123';
      const caseId = '123';
      const caseLastModified = 42;
      const fakeResponse = {
        headers: {
          get: () => caseLastModified
        }
      };

      beforeEach(() => {
        generator = raiseEvent({ caseInstanceId, planItemId, planItemName });
      });

      it('should signal CASE:PLAN_ITEM:RAISE_EVENT after it is invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT' }));
      });

      it('should invoke request.post with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${caseInstanceId}/planitems/${planItemId}/occur`,
          null,
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken
            }
          })).toBeTruthy;
      });

      it('should notify the APP:CASE_LAST_MODIFIED:SET', () => {
        generator.next();
        generator.next();
        expect(generator.next(fakeResponse).value)
          .toEqual(put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified }));
      });

      it('should notify success message', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        expect(generator.next().value)
          .toEqual(put(notifySuccess(`Successfully raised the event ${planItemName}`)));
      });

      it('should signal success', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        generator.next();
        expect(generator.next().value)
          .toEqual(put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT:SUCCESS' }));
      });

      it('should request case init', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        generator.next();
        generator.next();
        expect(generator.next().value)
          .toEqual(put({ type: 'CASE:REQUEST_INIT', caseId }));
      });
    });

    describe('when there is an error', () => {
      const planItemId = 'id';
      const planItemName = 'wilbur';
      const caseInstanceId = '123';

      beforeEach(() => {
        generator = raiseEvent({ caseInstanceId, planItemId, planItemName });
      });

      it('should signal CASE:PLAN_ITEM:RAISE_EVENT:FAIL', () => {
        const message = 'Fake error message';

        generator.next();

        expect(generator.throw({ message }).value)
          .toEqual(put({ type: 'CASE:PLAN_ITEM:RAISE_EVENT:FAIL', error: message }));
      });

      it('should notify danger message', () => {
        const message = 'Fake error message';

        generator.next();

        generator.throw({ message });
        expect(generator.next().value)
          .toEqual(put(notifyDanger(message)));
      });
    });
  });
});
