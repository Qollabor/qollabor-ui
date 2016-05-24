/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon from 'sinon';
import { fetchTaskDetails, transitionToState } from '../sagas';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import Immutable from 'immutable';

import helpers from '../../../services/helpers';

describe('feature/task/sagas', () => {
  describe('fetchTaskDetails saga', () => {
    let generator;
    let loggerErrorSpy;
    let requestSpy;
    const fakeToken = 'winter is coming';
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const action = {
      taskId: 'fakeId012345'
    };

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
              }
            )
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
        get: requestSpy
      });

      generator = fetchTaskDetails(action);
    });

    describe('When start fetchTaskDetails saga', () => {
      it('should signal TASK:FETCH after being invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'TASK:FETCH' }));
      });
    });

    describe('When fetchTaskDetails saga is started', () => {
      it('should do a task request with the correct taskId', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(
          `${fakeURL}/${action.taskId}`,
          null,
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken
            }
          })).to.be.true;
      });
    });

    describe('When the request is succesfull', () => {
      it('should signal TASK:FETCH:SUCCESS', () => {
        generator.next();
        generator.next();

        const dataKey = '_2';
        const fakeData = [{ a: 1, b: 2, c: 3 }];

        const response = generator.next({
          body: {
            [dataKey]: fakeData
          }
        });

        expect(response.value)
          .to.be.eql(put({ type: 'TASK:FETCH:SUCCESS', taskDetails: fakeData }));
      });
    });

    describe('When the request failed', () => {
      it('should signal TASK:FETCH:FAIL', () => {
        const fakeError = {
          message: 'Winter never left'
        };

        generator.next();
        generator.next();
        const response = generator.throw(fakeError);

        expect(response.value)
          .to.be.eql(put({ type: 'TASK:FETCH:FAIL', error: fakeError.message }));

        expect(loggerErrorSpy.calledOnce).to.be.true;
      });
    });
  });

  describe('transitionToState', () => {
    let generator;
    let loggerErrorSpy;
    let requestSpy;
    const fakeToken = 'winter is coming';
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const action = {
      taskId: 'fakeId012345',
      transition: 'action'
    };

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
              }
            )
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

      generator = transitionToState(action);
    });

    describe('When start transitionToState saga', () => {
      it('should signal TASK:TRANSITION after being invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'TASK:TRANSITION', taskId: action.taskId }));
      });
    });

    describe('When transitionToState saga is started', () => {
      it('should do a task request with the correct taskId and the correct transition', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(
          `${fakeURL}/${action.taskId}/${action.transition}`,
          null,
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken
            }
          })).to.be.true;
      });

      it('should notify the acceptance', () => {
        generator.next();
        generator.next();

        expect(generator.next().value)
          .to.be.eql(put({
            type: 'NOTIFIER:NOTIFY',
            dismissAfter: 3000,
            message: 'The transition has been accepted',
            level: 'success'
          }));
      });

      describe('When the request is successful', () => {
        it('should notify the TASK:TRANSITION:SUCCESS', () => {
          const caseLastModified = 42;

          generator.next();
          generator.next();
          generator.next({
            headers: {
              get: () => (caseLastModified)
            }
          });

          expect(generator.next().value)
            .to.be.eql(put({ type: 'TASK:TRANSITION:SUCCESS', taskId: action.taskId, caseLastModified }));
        });
      });

      describe('When there is an error', () => {
        it('should notify the TASK:TRANSITION:FAIL', () => {
          const error = 'Error';

          generator.next();
          generator.next();

          expect(generator.throw({ message: error }).value)
            .to.be.eql(put({ type: 'TASK:TRANSITION:FAIL', error }));
        });
      });
    });
  });
});
