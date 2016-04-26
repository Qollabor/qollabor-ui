import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Sample from '../index';
import ChildComponent from '../childComponent';

describe('features/sample', () => {
  describe('<Sample />', () => {
    it('should render a sample component', () => {
      const result = shallow(<Sample />);
      expect(result.find(ChildComponent).length).to.be.equal(1);
      expect(result.find(ChildComponent).props()).to.be.eql({ value: '1' });
    });
  });
});
