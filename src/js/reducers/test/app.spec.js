import { expect } from 'chai';
import Immutable from 'immutable';
import appReducer from '../app';

describe('reducers/app', () => {
  const defaultState = Immutable.Map(
    {
      menuItemCategory: null,
      isOnInit: false,
      showLeftNav: true
    }
  );

  it('should return the default state', () => {
    expect(
      appReducer(undefined, {})
    ).to.equal(defaultState);
  });

  it('should return the same state', () => {
    const startState = defaultState.set('anotherValue', 'someValue');
    const expectedState = startState;
    expect(
      appReducer(startState, {})
    ).to.equal(expectedState);
  });

  it('The init start should set true the oninit value', () => {
    const startState = defaultState;
    const expectedState = defaultState.set('isOnInit', true);

    expect(
      appReducer(startState, { type: 'APP:INIT' })
    ).to.equal(expectedState);
  });
});
