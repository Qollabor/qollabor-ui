import { expect } from 'chai';

import { put, take } from 'redux-saga/effects';
import { initAppFlow } from '../initAppFlow';


describe('sagas/app', () => {
  describe('initAppFLow', () => {
    const generator = initAppFlow();
    it('Should wait for an APP:INIT event', () => {
      expect(
        generator.next().value
      ).to.be.eql(take('APP:INIT'));
    });
    it('Should react to a APP:INIT event and send a APP:INIT:SUCCESS', () => {
      generator.next();
      expect(
        generator.next().value
      ).to.be.eql(put({ type: 'APP:INIT:SUCCESS' }));
    });
  });
});
