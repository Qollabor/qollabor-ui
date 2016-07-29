import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { TaskInfo } from '../index';
import TaskInfoItem from '../components/item';

describe('features/task/taskInfo', () => {
  describe('<TaskInfo />', () => {
    it('should not render if taskInfo props are not passed', () => {
      expect(shallow.bind(<TaskInfo />))
        .to.Throw();
    });
  });

  describe('<TaskInfo taskDetails={taskDetailsEmpty} without data', () => {
    const taskDetailsEmpty = {};
    const taskInfoWidget = shallow(
      <TaskInfo
        isFetching={false}
        error={{ isError: false, message: '' }}
        taskDetails={taskDetailsEmpty}
      />);

    it('should display of message that no tasks items are found', () => {
      expect(taskInfoWidget.find('div').contains('No items found!')).to.be.equal(true);
    });
  });

  describe('<TaskInfo taskDetails={taskDetails} /> with data', () => {
    const taskDetails = {
      modifiedBy: 'moduser',
      caseInstanceId: 'd62dea32_62b8_4206_b12e_029436d75001',
      rootCaseInstanceId: '36d3b02e_ee4a_4fdd_bd1e_379eddd60146',
      dueDate: '2016-05-23T10:00:11.922Z',
      caseDefinition: 'SomeDefinition',
      createdOn: '2016-03-05T14:21:28.731Z',
      planState: 'Active',
      parentCaseInstanceId: null,
      taskState: 'Assigned',
      assignee: 'admin',
      taskName: 'Review documents',
      owner: 'admin',
      role: 'reviewers',
      id: '0ff7d6a0_c17f_4e7f_97d4_ff9e996e0001',
      createdBy: 'creationuser',
      lastModified: '2016-03-08T09:44:32.345Z'
    };

    const taskInfoWidget = shallow(
      <TaskInfo
        isFetching={false}
        error={{ isError: false, message: '' }}
        taskDetails={taskDetails}
      />);

    it('should display of task information', () => {
      expect(taskInfoWidget.find(TaskInfoItem)).to.have.length(4);
    });

    it('should set prop itemLabel: Assignee of <TaskInfoItem /> correctly', () => {
      expect(taskInfoWidget.find(TaskInfoItem).at(0).prop('itemLabel')).to.equal('Received at');
    });

    it('should set prop itemLabel: Owner of <TaskInfoItem /> correctly', () => {
      expect(taskInfoWidget.find(TaskInfoItem).at(1).prop('itemLabel')).to.equal('Complete by');
    });

    it('should set prop itemValue: Assignee of <TaskInfoItem /> correctly', () => {
      expect(taskInfoWidget.find(TaskInfoItem).at(2).prop('itemValue')).to.equal('admin');
    });

    it('should set prop itemValue: Owner of <TaskInfoItem /> correctly', () => {
      expect(taskInfoWidget.find(TaskInfoItem).at(3).prop('itemValue')).to.equal('admin');
    });
  });
});
