import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import { TitledListBox } from 'cafienne-ui-elements';

import TaskListActive from '../component';

describe('features/task/tasklist-active', () => {
  const activeTasksList = [];

  describe('When the tasklist-active component is loading', () => {
    const taskListActive = shallow(<TaskListActive isFetching={true} activeTasks={activeTasksList} />);
    it('TitledListBox should have isFetching true prop', () => {
      expect(taskListActive.find(TitledListBox).props().isFetching).to.equal(true);
    });
  });

  describe('When the tasklist-active component is in error', () => {
    const error = {
      isError: true,
      message: 'This error should show up'
    };
    const taskListActiveError = shallow(
      <TaskListActive
        isFetching={false}
        activeTasks={activeTasksList}
        error={error}
      />);

    it('Should set the correct error prop in TitledListBox element', () => {
      expect(taskListActiveError.find(TitledListBox).props().error).to.equal(error);
    });
  });

  describe('When the tasklist-active component is ready', () => {
    const taskListArray = [
      {
        id: 'myTaskId01',
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        icon: 'view_list',
        taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
        color: '#388AC3'
      }
    ];

    const taskListActive = shallow(
      <TaskListActive
        isFetching={false}
        activeTasks={taskListArray}
      />);

    it('should display the list with active tasks', () => {
      expect(taskListActive.find(TitledListBox).props().items).to.equal(taskListArray);
    });
  });
});
