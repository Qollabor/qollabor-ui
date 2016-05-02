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
      appReducer(undefined, {}).toJSON()
    ).to.eql(defaultState.toJSON());
  });

  it('should return the same state', () => {
    const startState = defaultState.set('anotherValue', 'someValue');
    const expectedState = startState;
    expect(
      appReducer(startState, {}).toJSON()
    ).to.eql(expectedState.toJSON());
  });

  it('The init start should set true the oninit value', () => {
    const startState = defaultState;
    const expectedState = defaultState.set('isOnInit', true);

    expect(
      appReducer(startState, { type: 'APP:INIT' }).toJSON()
    ).to.eql(expectedState.toJSON());
  });
});
