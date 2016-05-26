import { expect } from 'chai';
import { shallow } from 'enzyme';
import Breadcrumb from '../index';
import React from 'react';
import sinon from 'sinon';

describe('components/breadcrumb', () => {
  const breadCrumbItems = [
    {
      label: 'My tasks',
      url: '#/tasks',
      id: '1'
    },
    {
      label: 'current task',
      url: '',
      id: '2'
    },
    {
      label: 'last task',
      url: '#/tasks/lasttask',
      id: '3'
    }
  ];

  const breadCrumbItemsEmpty = [];

  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning);
    });
  });
  /* eslint-disable no-console */
  after(() => console.error.restore());

  describe.skip('Load breadcrump without props', () => {
    it('shouldnt load the breadcrump', () => {
      expect(() => shallow.bind(<Breadcrumb />))
        .to.Throw('Warning: Failed propType: Required prop `items` was not specified in `Breadcrumb`');
    });
  });

  describe('Load Breadcrumb with list of items', () => {
    it('should show the correct breadcrum items', () => {
      expect(shallow(<Breadcrumb items={breadCrumbItems} />).find('#breadCrumbItem')).to.have.length(3);
    });
  });

  describe('Load Breadcrumb with separator', () => {
    it('should show the default \'>\' separator', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItems} />)
        .find('#separator').at(0).text()
      ).to.equal('>');
    });

    it('should show the correct separator', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItems} separator={'|'} />)
        .find('#separator').at(0).text()
      ).to.equal('|');
    });
  });

  describe('Load Breadcrumb with no items', () => {
    it('should show a message no items found', () => {
      expect(
        shallow(<Breadcrumb items={breadCrumbItemsEmpty} />)
        .contains('No breadcrumbs found!')
      ).to.equal(true);
    });
  });
});
