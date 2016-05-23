import { expect } from 'chai';
import registry from 'app-registry';
import Immutable from 'immutable';

import { addAuthHeader, addCaseLastModifiedHeader, addHeadersByName } from '../addHeadersByName';

describe('services/helpers/addHeadersByName', () => {
  describe('addAuthHeader', () => {
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';

    before(() => {
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
      registry.register('config', {
        login: {
          token: {
            httpHeader: fakeTokenPropertyName
          }
        }
      });
    });

    it('when invoked it generates the correct header', () => {
      expect(addAuthHeader())
        .to.be.eql({ [fakeTokenPropertyName]: fakeToken });
    });
  });

  describe('addAuthHeader', () => {
    const fakeHeaderName = 'something';

    before(() => {
      registry.reset();

      registry.register('config', {
        cases: {
          lastModifiedHttpHeader: fakeHeaderName
        }
      });
    });

    it('when invoked with a paramenter it generates the correct header', () => {
      expect(addCaseLastModifiedHeader(42))
        .to.be.eql({ [fakeHeaderName]: 42 });
    });

    it('when invoked with no parameters it returns an empty object', () => {
      expect(addCaseLastModifiedHeader())
        .to.be.eql({});
    });
  });

  describe('addHeadersByName', () => {
    const fakeHeaderName = 'something';
    const fakeTokenPropertyName = 'famousQuote';
    const fakeToken = 'winter is coming';

    before(() => {
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
      registry.register('config', {
        login: {
          token: {
            httpHeader: fakeTokenPropertyName
          }
        },
        cases: {
          lastModifiedHttpHeader: fakeHeaderName
        }
      });
    });

    it('when invoked with a wrong name it throws an header not recognized error', () => {
      expect(addHeadersByName.bind(null, ['wrong']))
        .to.Throw(Error, /Header not recognized wrong/);
    });

    describe('when invoked with several parameters', () => {
      it('auth alone', () => {
        expect(addHeadersByName(['cafienneAuth']))
          .to.be.eql({ headers: { [fakeTokenPropertyName]: fakeToken } });
      });

      it('caseLastModified alone with no params', () => {
        expect(addHeadersByName(['caseLastModified']))
          .to.be.eql({ headers: {} });
      });

      it('caseLastModified alone with params', () => {
        expect(addHeadersByName(['caseLastModified'], { caseLastModified: 42 }))
          .to.be.eql({ headers: { [fakeHeaderName]: 42 } });
      });

      it('auth and caseLastModified', () => {
        expect(addHeadersByName(['cafienneAuth', 'caseLastModified'], { caseLastModified: 42 }))
          .to.be.eql(
          {
            headers: {
              [fakeTokenPropertyName]: fakeToken,
              [fakeHeaderName]: 42
            }
          });
      });
    });
  });
});
