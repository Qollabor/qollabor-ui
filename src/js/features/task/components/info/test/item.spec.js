import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import TaskInfoItem from '../components/item';

describe('feature/taskinfo/item', () => {
  const itemLabel = 'My name';
  const itemValue = 'Martijn';
  const taskInfoItem = shallow(<TaskInfoItem itemLabel={itemLabel} itemValue={itemValue} />);

  describe('<TaskInfoItem /> with correct props', () => {
    it('should display item label', () => {
      expect(taskInfoItem.find('div').contains('My name')).to.equal(true);
    });

    it('should display item value', () => {
      expect(taskInfoItem.find('div').contains('Martijn')).to.equal(true);
    });
  });

  describe('<TaskInfoItem /> with no props', () => {
    it('should return false if itemValue is not set', () => {
      expect(() => shallow(<TaskInfoItem />)).to.have.lengthOf(0);
    });
  });
});
