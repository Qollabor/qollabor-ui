/* eslint global-require:0 */
require.requireMock('../../../store.js');

const { put } = require('redux-saga/effects');

jest.mock('../../../store', () => ({
  store: {
    getState: () => ({
      user: {
        getIn: () => 'bleh'
      },
      routing: {
        locationBeforeTransitions: '/'
      }
    }),
    dispatch: () => ''
  }
}));

describe('features/user/sagas', () => {
  let gen;

  beforeAll(() => {
    jest.resetModules();

    const internalSpy = jest.fn();
    const getSpy = jest.fn((type) => {
      if (type === 'config') {
        return {
          baseApiUrl: '',
          login: {
            redirectUrl: {
              defaultSuccess: '/tasks',
              defaultCancel: '/'
            },
            token: {
              httpHeader: 'X-AUTH-CAFIENNE',
              storage: {
                key: 'auth-cafienne'
              },
              expire: 1000 * 60 * 59// in milliseconds, 59 minutes
            },
            user: {
              storage: {
                key: 'user-cafienne'
              }
            }
          }
        };
      }

      if (type === 'storage') {
        return {
          removeItem: () => ''
        };
      }

      return (
        { get: internalSpy, post: internalSpy, put: internalSpy, error: internalSpy }
      );
    });


    jest.mock('app-registry', () => ({
      get: getSpy
    }));

    jest.mock('redux-saga/effects', () => ({
      put
    }));
  });

  describe('module', () => {
    it('should exist', () => {
      const exist = () => {
        require('../sagas');
      };

      expect(exist).not.toThrow();
    });

    it('should expose `tokenNotValidFlow`', () => {
      const sagas = require('../sagas');

      expect(sagas.tokenNotValidFlow).toBeDefined();
      expect(typeof sagas.tokenNotValidFlow === 'function').toBeTruthy();
    });

    it('should expose `logoutFlow`', () => {
      const sagas = require('../sagas');

      expect(sagas.logoutFlow).toBeDefined();
      expect(typeof sagas.logoutFlow === 'function').toBeTruthy();
    });

    it('should expose `setLoggedUserFlow`', () => {
      const sagas = require('../sagas');

      expect(sagas.setLoggedUserFlow).toBeDefined();
      expect(typeof sagas.setLoggedUserFlow === 'function').toBeTruthy();
    });

    it('should expose `unsetLoggedUserFlow`', () => {
      const sagas = require('../sagas');

      expect(sagas.unsetLoggedUserFlow).toBeDefined();
      expect(typeof sagas.unsetLoggedUserFlow === 'function').toBeTruthy();
    });

    it('should expose `tokenNotValidFlow`', () => {
      const sagas = require('../sagas');

      expect(sagas.tokenNotValidFlow).toBeDefined();
      expect(typeof sagas.tokenNotValidFlow === 'function').toBeTruthy();
    });

    it('should expose `changePassword`', () => {
      const sagas = require('../sagas');

      expect(sagas.changePassword).toBeDefined();
      expect(typeof sagas.changePassword === 'function').toBeTruthy();
    });

    it('should expose `updateAvatar`', () => {
      const sagas = require('../sagas');

      expect(sagas.updateAvatar).toBeDefined();
      expect(typeof sagas.updateAvatar === 'function').toBeTruthy();
    });

    it('should expose `fetchProfile`', () => {
      const sagas = require('../sagas');

      expect(sagas.fetchProfile).toBeDefined();
      expect(typeof sagas.fetchProfile === 'function').toBeTruthy();
    });

    it('should expose `updateProfile`', () => {
      const sagas = require('../sagas');

      expect(sagas.updateProfile).toBeDefined();
      expect(typeof sagas.updateProfile === 'function').toBeTruthy();
    });
  });

  describe('tokenNotValidFlow', () => {
    beforeEach(() => {
      const { tokenNotValidFlow } = require('../sagas');

      gen = tokenNotValidFlow();
    });

    it('should signal LOGIN:VERIFY:FAIL', () => {
      expect(gen.next().value)
        .toEqual(put({ type: 'LOGIN:VERIFY:FAIL' }));
    });

    it('LOGIN:LOGIN_REDIRECT_SET', () => {
      gen.next();

      expect(gen.next().value)
        .toEqual(put({ type: 'LOGIN:LOGIN_REDIRECT_SET', redirect: '/' }));
    });
  });

  describe('logoutFlow', () => {
    beforeEach(() => {
      const { logoutFlow } = require('../sagas');
      gen = logoutFlow();
    });

    describe('When the logout is request', () => {
      it('should signal USER:SET_LOGGED_USER with user null', () => {
        expect(gen.next().value)
          .toEqual(put({ type: 'USER:SET_LOGGED_USER', user: null }));
      });
    });
  });

  describe('setLoggedUserFlow', () => {
    const action = {
      user: 'testUser'
    };

    beforeEach(() => {
      const { setLoggedUserFlow } = require('../sagas');
      gen = setLoggedUserFlow(action);
    });

    describe('When the user is logged in', () => {
      it('should signal USER:SET_LOGGED_USER with current user', () => {
        expect(gen.next().value)
        .toEqual(put({ type: 'USER:SET_LOGGED_USER', user: action.user }));
      });
    });
  });

  describe('unsetLoggedUserFlow', () => {
    beforeEach(() => {
      const { unsetLoggedUserFlow } = require('../sagas');
      gen = unsetLoggedUserFlow();
    });

    describe('When the user is logged out', () => {
      it('should signal USER:SET_LOGGED_USER with user null', () => {
        expect(gen.next().value)
          .toEqual(put({ type: 'USER:SET_LOGGED_USER', user: null }));
      });
    });
  });

  describe('changePassword', () => {
    const action = {
      newPassword: 'new dummy password'
    };
    const data = {
      status: 204,
      body: { _2: 'bleh' }
    };
    beforeEach(() => {
      const { changePassword } = require('../sagas');
      gen = changePassword(action);
    });


    describe('When the request is successful', () => {
      it('should signal USER:CHANGE_PASSWORD:SUCCESS', () => {
        gen.next();
        gen.next(data);

        expect(gen.next().value)
          .toEqual(put({ type: 'USER:CHANGE_PASSWORD:SUCCESS', data: data.body._2 }));
      });
    });

    describe('When the request fails', () => {
      it('should signal USER:CHANGE_PASSWORD:FAIL', () => {
        const fakeError = {
          message: 'Password could not be changed.'
        };

        gen.next();
        const response = gen.throw(fakeError);

        expect(response.value)
      .toEqual(put({ type: 'USER:CHANGE_PASSWORD:FAIL', error: fakeError.message }));
      });
    });
  });
});
