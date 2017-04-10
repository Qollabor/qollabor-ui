/* eslint global-require:0 */

import { put } from 'redux-saga/effects';
import { updateRoute } from '../routing';


let gen;

describe('module', () => {
  it('should exist', () => {
    const exist = () => {
      require('../routing');
    };

    expect(exist).not.toThrow();
  });

  it('should expose `updateRoute`', () => {
    const routing = require('../routing');

    expect(routing.updateRoute).toBeDefined();
    expect(typeof routing.updateRoute === 'function').toBeTruthy();
  });
});


describe('changeRoute', () => {
  describe('When it is a case', () => {
    const action = {
      payload: {
        pathname: '/cases/blah123'
      }
    };

    beforeEach(() => {
      gen = updateRoute(action);
    });

    it('should dispatch CASE:REQUEST_INIT', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'CASE:REQUEST_INIT', caseId: 'blah123' }));
    });
  });

  describe('When it is not a case', () => {
    const otherAction = {
      payload: {
        pathname: '/tasks/blah123'
      }
    };

    beforeEach(() => {
      gen = updateRoute(otherAction);
    });

    it('should not dispatch CASE:REQUEST_INIT', () => {
      expect(gen.next())
        .toEqual({ done: true, value: undefined });
    });
  });
});
