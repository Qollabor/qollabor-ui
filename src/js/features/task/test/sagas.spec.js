import { expect } from 'chai';
import sinon from 'sinon';
import { fetchTaskDetails } from '../sagas';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';
import Immutable from 'immutable';

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
});
