import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Breadcrumb from '../index';

describe('components/breadcrumb', () => {
  const breadCrumbItems = [
    {
      label: 'My tasks',
      url: '#/tasks'
    },
    {
      label: 'current task',
      url: ''
    },
    {
      label: 'last task',
      url: '#/tasks/lasttask'
    }
  ];

  const breadCrumbItemsEmpty = [];

  beforeEach(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning);
    });
  });
  /* eslint-disable no-console */
  afterEach(() => console.error.restore());

  describe.skip('Load breadcrump without props', () => {
    it('shouldnt load the breadcrump', () => {
      expect(() => shallow.bind(<Breadcrumb />))
        .to.Throw('Warning: Failed propType: Required prop `items` was not specified in `Breadcrumb`');
    });
  });

  describe('Load Breadcrumb with list of items', () => {
    it('should show the correct breadcrum items', () => {
      expect(shallow(<Breadcrumb items={breadCrumbItems} />).find('.breadcrumb-url-item')).to.have.length(2);
    });
    it('should show the correct breadcrum no url items', () => {
      expect(shallow(<Breadcrumb items={breadCrumbItems} />).find('.breadcrumb-no-url-item')).to.have.length(1);
    });
  });

  describe('Load Breadcrumb with separator', () => {
    it('should show the default \'>\' separator', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItems} />)
        .find('.breadcrumb-separator').at(0).text()
      ).to.equal('>');
    });

    it('should show the correct separator', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItems} separator={'|'} />)
        .find('.breadcrumb-separator').at(0).text()
      ).to.equal('|');
    });
  });

  describe('Load Breadcrumb with no items', () => {
    it('should show a message no items found', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItemsEmpty} />)
        .contains('No breadcrumbs')
      ).to.equal(true);
    });
  });
});
