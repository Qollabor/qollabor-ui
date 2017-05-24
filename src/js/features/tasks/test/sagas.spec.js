/* eslint-disable no-unused-expressions */
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { fetchTasks, fetchTask, executeTaskAction } from '../sagas';
import helpers from '../../../helpers';
import { sanitizeAfterLoad } from '../../../helpers/task/sanitizeAfterLoad';

describe('features/tasks/sagas', () => {
  const fakeURL = 'some/fake/url';
  const fakeTokenPropertyName = 'famousQuote';
  const caseLastModifiedPropertyName = 'Case-Last-Modified';
  const fakeToken = 'winter is coming';
  const caseLastModified = 'wilbur-123';
  const taskId = 'blah';
  const taskAction = 'assign';
  let requestSpy;
  let generator;
  let loggerErrorSpy;

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
              caseLastModified
            }
          ),
          tasks: {
            filters: Immutable.fromJS({
              currentTasksFilter: {
                id: 'myTasks',
                label: 'My Tasks',
                filter: ['myTasks']
              }
            }),
            list: Immutable.fromJS({
              sortKey: 'dueDate',
              sortDesc: true
            })
          }
        };
      }
    };

    requestSpy = sinon.spy();
    registry.register('request', {
      get: requestSpy,
      put: requestSpy
    });
    registry.register('store', fakeStore);
    registry.register('helpers', helpers);
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
        version: 2,
        lastModifiedHttpHeader: caseLastModifiedPropertyName
      }
    });
    loggerErrorSpy = sinon.spy();
    registry.register('logger', { error: loggerErrorSpy });
  });

  describe('fetchTasks', () => {
    const action = {
      timeZone: '42'
    };

    beforeEach(() => {
      generator = fetchTasks(action);
    });

    describe('When it has not requested anything yet', () => {
      it('should signal TASKS:LIST:FETCH after being invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'TASKS:LIST:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(fakeURL, { assignee: 'admin',
          planState: 'Active',
          sortBy: 'dueDate',
          sortOrder: 'DESC' }, {
            headers: {
              [fakeTokenPropertyName]: fakeToken,
              [caseLastModifiedPropertyName]: caseLastModified,
              timeZone: '42'
            }
          })).toBeTruthy;
      });
    });

    describe('When the request is successful', () => {
      it('should signal TASKS:LIST:FETCH:SUCCESS', () => {
        const dataKey = '_2';
        const fakeData = [sanitizeAfterLoad({ a: 1, b: 2, c: 3 })];

        generator.next();
        generator.next();
        const response = generator.next({
          body: {
            [dataKey]: fakeData
          }
        });

        expect(response.value)
          .toEqual(put({ type: 'TASKS:LIST:FETCH:SUCCESS', tasks: fakeData }));
      });
    });

    describe('When the request fails', () => {
      it('should signal TASKS:LIST:FETCH:FAIL', () => {
        const fakeError = {
          message: 'Winter never left'
        };

        generator.next();
        generator.next();
        const response = generator.throw(fakeError);

        expect(response.value)
          .toEqual(put({ type: 'TASKS:LIST:FETCH:FAIL', error: fakeError.message }));
      });
    });
  });

  describe('fetchTask', () => {
    beforeEach(() => {
      generator = fetchTask({ taskId });
    });

    describe('When it has not requested anything yet', () => {
      it('should signal TASK:FETCH after being invoked', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'TASK:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(`${fakeURL}/${taskId}`, null, {
          headers: {
            [fakeTokenPropertyName]: fakeToken,
            [caseLastModifiedPropertyName]: caseLastModified
          }
        })).toBeTruthy;
      });
    });

    describe('When the request is successful', () => {
      it('should signal TASK:FETCH:SUCCESS', () => {
        const dataKey = '_2';
        const fakeData = sanitizeAfterLoad({ a: 1, b: 2, c: 3 });

        generator.next();
        generator.next();
        const response = generator.next({
          body: {
            [dataKey]: fakeData
          }
        });

        expect(response.value)
          .toEqual(put({ type: 'TASK:FETCH:SUCCESS', taskDetails: fakeData }));
      });
    });

    describe('When the request fails', () => {
      it('should signal TASK:FETCH:FAIL', () => {
        const fakeError = {
          message: 'Winter never left'
        };

        generator.next();
        generator.next();
        const response = generator.throw(fakeError);

        expect(response.value)
          .toEqual(put({ type: 'TASK:FETCH:FAIL', error: fakeError.message }));
      });
    });
  });

  describe('executeTaskAction', () => {
    const action = {
      taskId,
      taskAction
    };

    beforeEach(() => {
      generator = executeTaskAction(action);
    });

    describe('When start executeTaskActionn saga', () => {
      it('should notify TASK:ITEM:EXECUTE_ACTION', () => {
        expect(generator.next().value)
          .toEqual(put({ type: 'TASK:ITEM:EXECUTE_ACTION', taskId, taskAction }));
      });

      it('should do a task request', () => {
        generator.next();
        generator.next();

        const requestPayload = { assignee: '' };

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
        status: 202,
        headers: {
          get: () => caseLastModified
        }
      };

      it('should notify the APP:CASE_LAST_MODIFIED:SET', () => {
        generator.next();
        generator.next();

        expect(generator.next(fakeResponse).value)
          .toEqual(put({ type: 'APP:CASE_LAST_MODIFIED:SET', caseLastModified }));
      });

      it('should notify success', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);

        expect(generator.next().value)
          .toEqual(put({
            type: 'NOTIFIER:NOTIFY',
            dismissAfter: 3000,
            message: 'The action has been accepted',
            level: 'success'
          }));
      });

      it('should notify the TASK:ITEM:EXECUTE_ACTION:SUCCESS', () => {
        generator.next();
        generator.next();
        generator.next(fakeResponse);
        generator.next();

        expect(
          generator.next().value)
          .toEqual(put({ type: 'TASK:ITEM:EXECUTE_ACTION:SUCCESS' }));
      });
    });
  });
});
