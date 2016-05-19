import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaskList from '../component';

describe('features/task/taskList', () => {
  const callBack = () => true;
  const taskListTitle = 'My tasklist widget';
  const taskListArrayEmpty = [];
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

  describe('<TaskList />', () => {
    it('should not render if taskList props are not passed', () => {
      expect(shallow.bind(<TaskList />))
        .to.Throw();
    });
  });

  describe('<TaskList title={taskListTitle} taskList={taskListArray} onClickTaskListItem={callBack} />', () => {
    const taskListWidget = shallow(
      <TaskList
        title={taskListTitle}
        taskList={taskListArray}
        onClickTaskListItem={callBack}
      />);

    it('should display title of tasklist', () => {
      expect(taskListWidget.contains(taskListTitle)).to.equal(true);
    });

    it('should display the icons of the tasks', () => {
      expect(taskListWidget.find('.material-icons')).to.have.length(3);
    });

    it('should display the tasklist names', () => {
      taskListArray.map((taskListItem) => expect(taskListWidget.contains(taskListItem.taskName)).to.equal(true));
    });
  });

  describe('<TaskList title={taskListTitle} taskList={taskListArrayEmpty} onClickTaskListItem={callBack} />', () => {
    const taskListWidgetEmpty = shallow(
      <TaskList
        title={taskListTitle}
        taskList={taskListArrayEmpty}
        onClickTaskListItem={callBack}
      />);

    it('should display that no tasks can be found', () => {
      expect(taskListWidgetEmpty.find('#noTasksFound')).to.have.length(1);
    });
  });
});
