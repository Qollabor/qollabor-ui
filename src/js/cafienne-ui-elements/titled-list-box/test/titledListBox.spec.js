import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { TitledListBoxComponent } from '../index';
import ActionRow from '../actionRow';
import LinkRow from '../linkRow';

describe('components/titled-list-box', () => {
  const boxTitle = 'My tasklist widget';
  const titleArray = [
    {
      id: 'myTaskId01',
      caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
      icon: 'view_list',
      taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
      color: '#388AC3'
    },
    {
      id: 'myTaskId02',
      caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
      icon: 'query_builder',
      taskName: 'Second task item',
      color: '#F3974F'
    },
    {
      id: 'myTaskId03',
      caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
      icon: 'done_all',
      taskName: 'Thirth task item',
      color: '#82B75A'
    }
  ];

  describe('When called without props', () => {
    beforeEach(() => {
      sinon.stub(console, 'error', (warning) => {
        throw new Error(warning);
      });
    });
    /* eslint-disable no-console */
    afterEach(() => console.error.restore());

    it('should send a warning if title is not set', () => {
      expect(() => shallow.bind(<TitledListBoxComponent items={[]} labelField="name"/>))
        .to.Throw('Warning: Failed prop type: Required prop `title` was not specified in `TitledListBoxComponent`');
    });

    it('should send a warning if items is not set', () => {
      expect(() => shallow.bind(<TitledListBoxComponent title="Some title" labelField="name"/>))
        .to
        .Throw('Warning: Failed prop type: Required prop `items` was not specified in `TitledListBoxComponent`');
    });

    it('should send a warning id labelField is not set', () => {
      expect(() => shallow.bind(<TitledListBoxComponent title="Some title" items={[]}/>))
        .to
        .Throw('Warning: Failed prop type: Required prop `labelField` was not specified in `TitledListBoxComponent`');
    });
  });

  describe('When called with a list of action items', () => {
    let titledListBoxWidget;
    let items;
    beforeEach(() => {
      items = titleArray.map(item => {
        item.action = sinon.spy();
        return item;
      });
      titledListBoxWidget = shallow(
        <TitledListBoxComponent
          title={boxTitle}
          items={items}
          labelField="taskName"
        />);
    });

    it('should display the right list of items', () => {
      expect(titledListBoxWidget.find(ActionRow)).to.have.length(3);
    });
  });

  describe('When called with a list of url item', () => {
    let titledListBoxWidget;
    let items;
    beforeEach(() => {
      items = titleArray.map(item => {
        item.url = 'someurl';
        return item;
      });
      titledListBoxWidget = shallow(
        <TitledListBoxComponent
          title={boxTitle}
          items={items}
          labelField="taskName"
        />);
    });

    it('should display the right list of items', () => {
      expect(titledListBoxWidget.find(LinkRow)).to.have.length(3);
    });
  });

  describe('When called with a empty list of items', () => {
    let titledListBoxWidget;
    let items;
    beforeEach(() => {
      items = [];
      titledListBoxWidget = shallow(
        <TitledListBoxComponent
          title={boxTitle}
          items={items}
          emptyListMessage="No items"
          labelField="taskName"
        />);
    });

    it('should display the right list of items', () => {
      expect(titledListBoxWidget.find(LinkRow)).to.have.length(0);
      expect(titledListBoxWidget.find(ActionRow)).to.have.length(0);
    });

    it('should display the no element message', () => {
      expect(titledListBoxWidget.find('span').text()).to.equal('No items');
    });
  });
});
