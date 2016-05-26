import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import TaskListCompleted from '../component';
import TitledListBox from '../../../../../components/titled-list-box';
describe('features/task/tasklist-completed', () => {
  const completedTasksList = [];

  describe('When the tasklist-completed component is loading', () => {
    const taskListCompleted = shallow(<TaskListCompleted isFetching={true} completedTasks={completedTasksList} />);
    it('TitledListBox should have isFetching true prop', () => {
      expect(taskListCompleted.find(TitledListBox).props().isFetching).to.equal(true);
    });
  });

  describe('When the tasklist-completed component is in error', () => {
    const error = {
      isError: true,
      message: 'This error should show up'
    };
    const taskListCompletedError = shallow(
      <TaskListCompleted
        isFetching={false}
        completedTasks={completedTasksList}
        error={error}
      />);

    it('Should set the correct error prop in TitledListBox element', () => {
      expect(taskListCompletedError.find(TitledListBox).props().error).to.equal(error);
    });
  });

  describe('When the tasklist-completed component is ready', () => {
    const taskListArray = [
      {
        id: 'myTaskId01',
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        icon: 'view_list',
        taskName: 'First task item with very long sentence which will never end blab blal bal bal bl abal',
        color: '#388AC3'
      }
    ];

    const taskListCompleted = shallow(
      <TaskListCompleted
        isFetching={false}
        completedTasks={taskListArray}
      />);

    it('should display the list with completed tasks', () => {
      expect(taskListCompleted.find(TitledListBox).props().items).to.equal(taskListArray);
    });
  });
});
