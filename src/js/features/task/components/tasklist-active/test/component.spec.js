import { shallow } from 'enzyme';
import { expect } from 'chai';
import React from 'react';
import TaskListActive from '../component';

describe('features/task/tasklist-active', () => {
  const activeTasksList = [];

  describe('When the tasklist-active component is loading', () => {
    const taskListActive = shallow(<TaskListActive isFetching={true} activeTasks={activeTasksList} />);
    const taskListLoader = 'Show <TaskListActiveLoader/>';

    it('Should display a loader message', () => {
      expect(taskListActive.contains(taskListLoader)).to.equal(true);
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

    const taskListError = `Show <TaskListActiveError/> with msg:${error.message}`;
    it('Should display an error message', () => {
      expect(taskListActiveError.contains(taskListError)).to.equal(true);
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

    const taskListActiveItems = taskListActive.find('div').children().node.props.taskList;
    it('should display the list with active tasks', () => {
      expect(taskListActiveItems[0].taskName).to.equal(taskListArray[0].taskName);
    });
  });
});
