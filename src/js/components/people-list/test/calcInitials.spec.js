import { expect } from 'chai';
import { calcInitials } from '../helpers/calcInitials';

describe('function/calcInitials', () => {
  describe('Given a fullname', () => {
    it('Should return the correct initial', () => {
      expect(calcInitials('Martijn van der Plaat')).to.be.equal('MP');
    });
  });

  describe('When no fullname exist', () => {
    it('Should return a default value', () => {
      expect(calcInitials('')).to.be.equal('XX');
    });
  });
});
