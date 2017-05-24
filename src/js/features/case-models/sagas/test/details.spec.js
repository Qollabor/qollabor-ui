/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import Immutable from 'immutable';
import { startCaseModel } from '../details';

import helpers from '../../../../helpers';

describe('feature/case-models/sagas', () => {
  describe('startCaseModel', () => {
    let generator;
    let loggerErrorSpy;
    let requestSpy;
    const fakeToken = 'winter is coming';
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const caseLastModified = 'wilbur-123';
    const caseId = 'blah123';
    const definition = 'helloworld.xml';
    const name = 'Hello World';
    const inputs = { Greeting: { From: 'Admin' } };
    const members = [];

    beforeEach(() => {
      registry.reset();
      const fakeStore = {
        getState () {
          return {
            user: Immutable.fromJS({
              loggedUser: {
                token: fakeToken,
                username: 'admin'
              }
            }),
            casemodel: {
              caseTeam: Immutable.fromJS({ roles: { ADMIN: [] } }),
              details: Immutable.fromJS({
                data: { name },
                caseData: inputs,
                definition
              })
            }
          };
        }
      };
      registry.register('store', fakeStore);
    });

    beforeEach(() => {
      registry.register('config', {
        login: {
          token: {
            httpHeader: fakeTokenPropertyName
          }
        },
        tasks: {
          url: fakeURL,
          version: 1
        },
        cases: {
          url: fakeURL,
          lastModifiedHttpHeader: 'Case-Last-Modified'
        }
      });
    });

    beforeEach(() => {
      registry.register('helpers', helpers);
    });

    beforeEach(() => {
      loggerErrorSpy = sinon.spy();
      registry.register('logger', { error: loggerErrorSpy });
    });

    beforeEach(() => {
      requestSpy = sinon.spy();
      registry.register('request', {
        post: requestSpy
      });

      generator = startCaseModel();
    });

    describe('When start startCaseModel saga', () => {
      it('should do a task request', () => {
        generator.next().value;

        const requestPayload = { definition, name, inputs, caseTeam: { members } };

        expect(requestSpy.calledWith(
          fakeURL,
          requestPayload,
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken
            }
          })).toBeTruthy;
      });
    });

    describe('When the request is successful', () => {
      const fakeResponse = {
        status: 201,
        headers: {
          get: () => caseLastModified
        },
        body: { caseInstanceId: caseId }
      };

      it('should notify the APP:CASE_LAST_MODIFIED:SET', () => {
        generator.next();

        expect(generator.next(fakeResponse).value)
          .toEqual(put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified }));
      });

      it('should notify the CASEMODEL:START:SUCCESS', () => {
        generator.next();
        generator.next(fakeResponse);

        expect(
          generator.next().value)
          .toEqual(put({ type: 'CASEMODEL:START:SUCCESS', caseId, caseLastModified }));
      });
    });

    describe('When the request fails', () => {
      it('should signal CASEMODEL:START:FAIL', () => {
        const fakeError = {
          message: 'doh!'
        };

        generator.next();
        const response = generator.throw(fakeError);

        expect(response.value)
          .toEqual(put({ type: 'CASEMODEL:START:FAIL', error: fakeError.message }));
      });
    });
  });
});
