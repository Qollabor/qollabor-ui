import { expect } from 'chai';
import ToolTip from '../index';
import { shallow } from 'enzyme';
import React from 'react';

describe('component/tooltip', () => {
  describe('create tooltip with message', () => {
    const ToolTipElement = shallow(
      <ToolTip
        style={{ float: 'left' }}
        message="This is our tooltip msg"
        tagName="div"
      >
        <button>My button</button>
      </ToolTip>);

    it('should have the right tooltip value', () => {
      expect(ToolTipElement.find('div').prop('data-tooltip')).to.be.equal('This is our tooltip msg');
    });

    it('should have the right tag element', () => {
      expect(ToolTipElement.find('div')).to.have.lengthOf(1);
    });
  });
});
