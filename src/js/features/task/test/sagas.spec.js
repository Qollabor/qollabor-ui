/* eslint-disable no-unused-expressions */
import sinon from 'sinon';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import Immutable from 'immutable';
import { fetchTaskDetails, transitionToState, saveTaskDetails } from '../sagas';

import helpers from '../../../helpers';

describe('feature/task/sagas', () => {
  describe('fetchTaskDetails saga', () => {
    let generator;
    let loggerErrorSpy;
    let requestSpy;
    const fakeToken = 'winter is coming';
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const caseLastModifiedPropertyName = 'Case-Last-Modified';
    const caseLastModified = 'blah';
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
            ),
            app: Immutable.fromJS(
              {
                caseLastModified: 'wilbur-123'
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
          url: fakeURL,
          version: 2
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
          .toEqual(put({ type: 'TASK:FETCH' }));
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
              [fakeTokenPropertyName]: fakeToken,
              [caseLastModifiedPropertyName]: caseLastModified
            }
          })).toBeTruthy;
      });
    });

    describe('When the request is successful', () => {
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
          .toEqual(put({ type: 'TASK:FETCH:SUCCESS', taskDetails: fakeData }));
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
          .toEqual(put({ type: 'TASK:FETCH:FAIL', error: fakeError.message }));

        expect(loggerErrorSpy.calledOnce).toBeTruthy;
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
          .toEqual(put({ type: 'TASK:TRANSITION', taskId: action.taskId }));
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
          })).toBeTruthy;
      });

      it('should notify the acceptance', () => {
        generator.next();
        generator.next();

        const response = {
          headers: {
            get: () => ({})
          },
          status: 202
        };

        expect(generator.next(response).value)
          .toEqual(put({
            type: 'NOTIFIER:NOTIFY',
            dismissAfter: 3000,
            message: 'The transition has been accepted',
            level: 'success'
          }));
      });

      describe('When the request is successful', () => {
        const caseLastModified = 42;

        it('should notify the TASK:TRANSITION:SUCCESS', () => {
          generator.next();
          generator.next();
          generator.next({
            headers: {
              get: () => (caseLastModified)
            },
            status: 202
          });

          expect(generator.next().value)
            .toEqual(put({ type: 'TASK:TRANSITION:SUCCESS', taskId: action.taskId }));
        });

        it('should notify the APP:CASE_LAST_MODIFIED:SET', () => {
          generator.next();
          generator.next();
          generator.next({
            headers: {
              get: () => (caseLastModified)
            },
            status: 202
          });
          generator.next();

          expect(generator.next().value)
            .toEqual(put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified }));
        });
      });

      describe('When there is an error', () => {
        it('should notify the TASK:TRANSITION:FAIL', () => {
          const error = 'Error';

          generator.next();
          generator.next();

          expect(generator.throw({ message: error }).value)
            .toEqual(put({ type: 'TASK:TRANSITION:FAIL', error }));
        });
      });
    });
  });

  describe('saveTaskDetails', () => {
    let generator;
    let loggerErrorSpy;
    let requestSpy;
    const fakeToken = 'winter is coming';
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const caseLastModified = 'wilbur-123';
    const action = {
      taskId: 'fakeId012345',
      taskData: { Response: { Message: 'blah' } }
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
        put: requestSpy
      });

      generator = saveTaskDetails(action);
    });

    describe('When start saveTaskDetails saga', () => {
      it('should signal TASK:SAVE after being invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'TASK:SAVE', taskId: action.taskId }));
      });
    });

    describe('When saveTaskDetails saga is started', () => {
      it('should do a task request with the correct taskId and the correct taskData', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(
          `${fakeURL}/${action.taskId}`,
          action.taskData,
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken
            }
          })).toBeTruthy;
      });
    });

    describe('When the request is successful', () => {
      it('should notify the APP:CASE_LAST_MODIFIED:SET', () => {
        generator.next();
        generator.next();

        const response = {
          headers: {
            get: () => (caseLastModified)
          }
        };

        expect(generator.next(response).value)
          .toEqual(put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified }));
      });

      it('should notify success', () => {
        generator.next();
        generator.next();
        generator.next({
          headers: {
            get: () => (caseLastModified)
          }
        });

        expect(generator.next().value)
          .toEqual(put({
            type: 'NOTIFIER:NOTIFY',
            dismissAfter: 3000,
            message: 'The task has been saved',
            level: 'success'
          }));
      });

      it('should notify the TASK:SAVE:SUCCESS', () => {
        generator.next();
        generator.next();
        generator.next({
          headers: {
            get: () => (caseLastModified)
          }
        });
        generator.next();

        expect(generator.next().value)
          .toEqual(put({ type: 'TASK:SAVE:SUCCESS', taskId: action.taskId }));
      });

      it('should notify the TASK:REQUEST_INIT', () => {
        generator.next();
        generator.next();
        generator.next({
          headers: {
            get: () => (caseLastModified)
          }
        });
        generator.next();
        generator.next();

        expect(generator.next().value)
          .toEqual(put({ type: 'TASK:REQUEST_INIT', taskId: action.taskId }));
      });
    });

    describe('When there is an error', () => {
      it('should notify the TASK:SAVE:FAIL', () => {
        const error = 'Error';

        generator.next();
        generator.next();

        expect(generator.throw({ message: error }).value)
          .toEqual(put({ type: 'TASK:SAVE:FAIL', error }));
      });
    });
  });
});
