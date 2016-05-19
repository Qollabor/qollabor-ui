import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import TaskListCompleted from '../component';

describe('features/task/tasklist-completed', () => {
  const completedTasksList = [];

  describe('When the tasklist-completed component is loading', () => {
    const taskListCompleted = shallow(<TaskListCompleted isFetching={true} completedTasks={completedTasksList} />);
    const taskListLoader = 'Show <TaskListCompletedLoader/>';

    it('Should display a loader message', () => {
      expect(taskListCompleted.contains(taskListLoader)).to.equal(true);
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

    const taskListError = `Show <TaskListCompletedError/> with msg:${error.message}`;
    it('Should display an error message', () => {
      expect(taskListCompletedError.contains(taskListError)).to.equal(true);
    });
  });

  describe('When the tasklist-completed component is ready', () => {
    const taskListArray = [
      {
        id: 'myTaskId01',
        caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
        icon: 'done',
        taskName: 'This task item is completed',
        color: '#388AC3'
      }
    ];

    const taskListCompleted = shallow(
      <TaskListCompleted
        isFetching={false}
        completedTasks={taskListArray}
      />);

    const taskListCompletedItems = taskListCompleted.find('div').children().node.props.taskList;
    it('should display the list with active tasks', () => {
      expect(taskListCompletedItems[0].taskName).to.equal(taskListArray[0].taskName);
    });
  });
});
