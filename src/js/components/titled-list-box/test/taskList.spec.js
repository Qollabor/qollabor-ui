import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TitledListBox, { TitledListBoxComponent } from '../index';

describe('components/titled-list-box', () => {
  const taskListTitle = 'My tasklist widget';
  const taskListArray = [
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
    before(() => {
      sinon.stub(console, 'error', (warning) => {
        throw new Error(warning);
      });
    });
    /* eslint-disable no-console */
    after(() => console.error.restore());

    it('should send a warning id title is not set', () => {
      expect(() => shallow.bind(<TitledListBox />))
        .to.Throw('Warning: Failed propType: Required prop `title` was not specified in `TitledListBox`');
    });

    it('should send a warning id taskList is not set', () => {
      expect(() => shallow.bind(<TitledListBox title="Some title"/>))
        .to.Throw('Warning: Failed propType: Required prop `items` was not specified in `TitledListBox`');
    });
  });

  describe('When called with a list of action task', () => {
    let taskListWidget;
    let taskList;
    before(() => {
      taskList = taskListArray.map(item => {
        item.action = sinon.spy();
        return item;
      });
      taskListWidget = shallow(
        <TitledListBox
          title={taskListTitle}
          taskList={taskList}
        />);
    });

    it('should set the right title in titleBox', () => {
      const titledListBox = taskListWidget.find(TitledListBoxComponent);
      expect(titledListBox.props().title).to.equal(taskListTitle);
    });
  });

  describe('When called with a list of url task', () => {
    let taskListWidget;
    let taskList;
    before(() => {
      taskList = taskListArray.map(item => {
        item.url = 'someurl';
        return item;
      });
      taskListWidget = shallow(
        <TitledListBox
          title={taskListTitle}
          taskList={taskList}
        />);
    });

    it('should set the right title in titleBox', () => {
      const titledBox = taskListWidget.find(TitledListBoxComponent);
      expect(titledBox.props().title).to.equal(taskListTitle);
    });
  });

  describe('When called with a empty list of task', () => {
    let taskListWidget;
    let taskList;
    let titledBox;

    before(() => {
      taskList = [];
      taskListWidget = shallow(
        <TitledListBox
          title={taskListTitle}
          taskList={taskList}
          emptyListMessage="No tasks"
        />);
      titledBox = taskListWidget.find(TitledListBoxComponent);
    });

    it('should set the right title in titleBox', () => {
      expect(titledBox.props().title).to.equal(taskListTitle);
    });

    it('should display the no element message', () => {
      expect(titledBox.props().emptyListMessage).to.equal('No tasks');
    });
  });
});
