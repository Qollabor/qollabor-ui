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
  describe('When it is a case-list', () => {
    const action = {
      payload: {
        pathname: '/cases'
      }
    };

    beforeEach(() => {
      gen = updateRoute(action);
    });

    it('should dispatch TASK:DETAIL:RESET', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'TASK:DETAIL:RESET' }));
    });


    it('should dispatch not anymore actions', () => {
      gen.next();
      expect(gen.next())
          .toEqual({ done: true, value: undefined });
    });
  });


  describe('When it is a case', () => {
    const action = {
      payload: {
        pathname: '/cases/blah123'
      }
    };

    beforeEach(() => {
      gen = updateRoute(action);
    });

    it('should dispatch TASK:DETAIL:RESET', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'TASK:DETAIL:RESET' }));
    });


    it('should dispatch TASK:SET_REDIRECT', () => {
      gen.next();
      expect(gen.next().value)
        .toEqual(put({ type: 'TASK:SET_REDIRECT', redirectToCase: true }));
    });

    it('should dispatch CASE:REQUEST_INIT', () => {
      gen.next();
      gen.next();
      expect(gen.next().value)
        .toEqual(put({ type: 'CASE:REQUEST_INIT', caseId: 'blah123' }));
    });
  });

  describe('When it is a task', () => {
    const taskAction = {
      payload: {
        pathname: '/tasks/blah123'
      }
    };

    beforeEach(() => {
      gen = updateRoute(taskAction);
    });

    it('should not dispatch any action', () => {
      expect(gen.next())
          .toEqual({ done: true, value: undefined });
    });
  });

  describe('When it is tasks', () => {
    const tasksAction = {
      payload: {
        pathname: '/tasks'
      }
    };

    beforeEach(() => {
      gen = updateRoute(tasksAction);
    });

    it('should dispatch TASK:SET_REDIRECT', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'TASK:SET_REDIRECT', redirectToCase: false }));
    });

    it('should not dispatch CASE:REQUEST_INIT', () => {
      gen.next();
      expect(gen.next())
        .toEqual({ done: true, value: undefined });
    });
  });

  describe('When it is root path', () => {
    const tasksAction = {
      payload: {
        pathname: '/'
      }
    };

    beforeEach(() => {
      gen = updateRoute(tasksAction);
    });

    it('should dispatch TASK:SET_REDIRECT', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'TASK:SET_REDIRECT', redirectToCase: false }));
    });

    it('should not dispatch CASE:REQUEST_INIT', () => {
      gen.next();
      expect(gen.next())
        .toEqual({ done: true, value: undefined });
    });
  });
});
