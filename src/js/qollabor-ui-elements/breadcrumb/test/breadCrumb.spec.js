import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Breadcrumb from '../index';


describe('components/breadcrumb', () => {
  const item =
    {
      label: 'My Tasks',
      url: '#/',
      description: 'Receive Greeting'
    };

  beforeEach(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning);
    });
  });
  /* eslint-disable no-console */
  afterEach(() => console.error.restore());

  describe.skip('Load breadcrumb without props', () => {
    it('should not load the breadcrumb', () => {
      expect(() => shallow.bind(<Breadcrumb />))
        .to.Throw('Warning: Failed propType: Required prop `currentTask` was not specified in `Breadcrumb`');
    });
  });

  describe('Load Breadcrumb with current task', () => {
    it('should show the correct breadcrumb current tasks', () => {
      expect(shallow(<Breadcrumb item={item} />).find('.breadcrumb-url-item').at(0).text()
    ).to.equal('My Tasks');
    });
    it('should show the correct breadcrumb no url items', () => {
      expect(shallow(<Breadcrumb item={item} />).find('.breadcrumb-no-url-item').at(0).text()
    ).to.equal('Receive Greeting');
    });
  });

  describe('Load Breadcrumb with separator', () => {
    it('should show the default \'>\' separator', () => {
      expect(
        shallow(<Breadcrumb item={item} />)
        .find('.breadcrumb-separator').at(0).text()
      ).to.equal('>');
    });

    it('should show the correct separator', () => {
      expect(
        shallow(<Breadcrumb item={item} separator={'|'} />)
        .find('.breadcrumb-separator').at(0).text()
      ).to.equal('|');
    });
  });
});
