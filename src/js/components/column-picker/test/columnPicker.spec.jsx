/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { IconButton, Popover, Menu, MenuItem } from 'material-ui';

import { ColumnPicker } from '../columnPicker';

describe('features/taskList/columnPicker', () => {
  describe('<ColumnPicker />', () => {
    it('should not render if header definition is not passed', () => {
      expect(shallow.bind(<ColumnPicker />))
        .to.Throw();
    });
  });

  describe('<ColumnPicker columns={something} />', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: true
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: false
      }
    ];

    let result;

    before(() => {
      result = shallow(<ColumnPicker columns={columns}/>);
    });

    it('should render', () => {
      expect(result)
        .to.not.be.undefined;
    });

    it('should show the cog button', () => {
      expect(result.find(IconButton).length)
        .to.be.equal(1);
    });

    it('should setup a popover component to show after a click on the cog button', () => {
      expect(result.find(Popover).length)
        .to.be.equal(1);
    });

    it('should include one Menu as Popover child', () => {
      expect(result.find(Popover).find(Menu).length)
        .to.be.equal(1);
    });

    it('should include two MenuItems Menu inside the menu', () => {
      expect(result.find(Popover).find(Menu).find(MenuItem).length)
        .to.be.equal(2);
    });

    it('should include the first column information as the first MenuItem', () => {
      expect(result.find(Popover).find(Menu).find(MenuItem).at(0).prop('primaryText'))
        .to.be.equal('Field 1');
    });

    it('should include the second column information as the second MenuItem', () => {
      expect(result.find(Popover).find(Menu).find(MenuItem).at(1).prop('primaryText'))
        .to.be.equal('Field 2');
    });

    it('should show a checked checkbox as the first MenuItem icon', () => {
      expect(result.find(Popover).find(Menu).find(MenuItem).at(0).prop('leftIcon').props.children)
        .to.be.equal('check_box');
    });

    it('should show a checked checkbox as the first MenuItem icon', () => {
      expect(result.find(Popover).find(Menu).find(MenuItem).at(1).prop('leftIcon').props.children)
        .to.be.equal('check_box_outline_blank');
    });
  });

  describe('<ColumnPicker columns={something} />', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: true
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: false
      }
    ];

    let result;

    before(() => {
      result = shallow(<ColumnPicker columns={columns}/>);
    });

    it('should set the internal state to open after a click on the cog button', () => {
      result.find(IconButton).at(0).simulate('touchTap', { currentTarget: result.find(IconButton).at(0) });

      expect(result.state().open)
        .to.be.true;
    });

    it.skip('should set the internal state to closed after two clicks on the cog button', () => {
      // FIXME find a way to simulate an event that closes the component, for some reason this doesn't work
      result.find(IconButton).at(0).simulate('touchTap', { currentTarget: result.find(IconButton).at(0) });
      result.simulate('touchTap');

      expect(result.state().open)
        .to.be.false;
    });
  });
});
