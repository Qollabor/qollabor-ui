/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../activeTasks';

const defaultState = Immutable.Map({
  isFetching: false,
  items: [],
  error: {
    isError: false,
    message: ''
  }
});

describe('features/case/reducers/activeTasks', () => {
  describe('When the reducer starts', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('A not existing action in the reducer', () => {
    it('should return the same state', () => {
      expect(reducers(defaultState, { type: 'CASE:ACTIVE_TASKS:WRONG' }).toJS())
        .to.eql(defaultState.toJS());
    });
  });
});
