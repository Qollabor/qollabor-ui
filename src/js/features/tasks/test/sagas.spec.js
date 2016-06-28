/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';

import Immutable from 'immutable';
import { put } from 'redux-saga/effects';
import registry from 'app-registry';

import { fetchTasks } from '../sagas';
import helpers from '../../../helpers';

describe('features/tasks/sagas', () => {
  describe('fetchTasks', () => {
    const fakeURL = 'some/fake/url';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';
    let requestSpy;
    let generator;
    let loggerErrorSpy;
    const action = {
      timeZone: '42'
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
            tasks: {
              filters: Immutable.fromJS({
                currentTasksFilter: {
                  id: 'myTasks',
                  label: 'My Tasks',
                  filter: ['myTasks']
                }
              })
            }
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
        tasks: {
          url: fakeURL,
          version: 2
        }
      });
      loggerErrorSpy = sinon.spy();
      registry.register('logger', { error: loggerErrorSpy });

      generator = fetchTasks(action);
    });

    describe('When it has not requested anything yet', () => {
      it('should signal TASKS:LIST:FETCH after being invoked', () => {
        expect(generator.next().value)
          .to.be.eql(put({ type: 'TASKS:LIST:FETCH' }));
      });

      it('should invoke request.get with the right parameters', () => {
        generator.next();
        generator.next();

        expect(requestSpy.calledWith(fakeURL, { assignee: 'admin', planState: 'Active' }, {
          headers: {
            [fakeTokenPropertyName]: fakeToken,
            timeZone: '42'
          }
        })).to.be.true;
      });
    });

    describe('When the request is successful', () => {
      it('should signal TASKS:LIST:FETCH:SUCCESS', () => {
        const dataKey = 'tasks';
        const fakeData = [{ a: 1, b: 2, c: 3 }];

        generator.next();
        generator.next();
        const response = generator.next({
          body: {
            [dataKey]: fakeData
          }
        });

        expect(response.value)
          .to.be.eql(put({ type: 'TASKS:LIST:FETCH:SUCCESS', tasks: fakeData }));
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
          .to.be.eql(put({ type: 'TASKS:LIST:FETCH:FAIL', error: fakeError.message }));
        expect(loggerErrorSpy.calledOnce).to.be.true;
      });
    });
  });
});
