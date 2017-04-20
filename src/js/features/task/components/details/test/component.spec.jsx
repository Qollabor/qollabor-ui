import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TaskModelSchemaForm from '../../schema-form';
import { StatusCapsule } from '../../../../../components/capsules';

import TaskDetails from '../taskDetails';

const caseId = 'blah';
const taskId = '123';
const isFetching = false;
const loggedInUserId = 'admin';
const taskDetails = { assignee: 'wilbur', mappedInput: { dog: 'wilbur' }, planState: 'Active', taskState: 'Assigned' };
const taskDetailsRawOutput = { assignee: 'wilbur', rawOutput: { raw: 'output' } };

describe('features/task/taskDetails', () => {
  describe('<TaskDetails />', () => {
    it('should not render if props are not passed', () => {
      expect(shallow.bind(<TaskDetails />))
        .to.Throw();
    });

    it('should not render if taskDetails prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .to.Throw();
    });

    it('should not render if caseId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          taskId={taskId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .to.Throw();
    });

    it('should not render if taskId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .to.Throw();
    });

    it('should not render if isFetching prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          loggedInUserId={loggedInUserId}
        />))
        .to.Throw();
    });

    it('should not render if loggedInUserId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />))
        .to.Throw();
    });

    it('should set formData to taskDetails mappedInput if no rawOutput object', () => {
      expect(shallow(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />).find(TaskModelSchemaForm).prop('formData')).to.equal(taskDetails.mappedInput);
    });

    it('should set formData to taskDetails to rawOutput if available', () => {
      expect(shallow(
        <TaskDetails
          taskDetails={taskDetailsRawOutput}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />).find(TaskModelSchemaForm).prop('formData')).to.equal(taskDetailsRawOutput.rawOutput);
    });
  });

  describe('when task assignee is not the task owner', () => {
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetails}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={loggedInUserId}
      />);

    it('should set prop disabled of <TaskModelSchemaForm /> to true', () => {
      expect(taskDetailsComponent.find(TaskModelSchemaForm).prop('disabled')).to.equal(true);
    });
  });

  describe('when task assignee is the task owner', () => {
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetails}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop disabled of <TaskModelSchemaForm /> to false', () => {
      expect(taskDetailsComponent.find(TaskModelSchemaForm).prop('disabled')).to.equal(false);
    });
  });

  describe('when planState is Active', () => {
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetails}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to the taskState prop', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Assigned');
    });

    it('should set children of <StatusCapsule /> to the taskState prop', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Assigned');
    });
  });


  describe('when planState is Completed', () => {
    const taskDetailsCompleted = { assignee: 'wilbur', planState: 'Completed', taskState: 'Assigned' };
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetailsCompleted}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to Completed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Completed');
    });

    it('should set children of <StatusCapsule /> to Completed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Completed');
    });
  });

  describe('when planState is Available', () => {
    const taskDetailsCompleted = { assignee: 'wilbur', planState: 'Available', taskState: 'Assigned' };
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetailsCompleted}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to Available', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Available');
    });

    it('should set children of <StatusCapsule /> to Available', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Available');
    });
  });

  describe('when planState is Terminated', () => {
    const taskDetailsCompleted = { assignee: 'wilbur', planState: 'Terminated', taskState: 'Assigned' };
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetailsCompleted}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to Terminated', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Terminated');
    });

    it('should set children of <StatusCapsule /> to Terminated', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Terminated');
    });
  });

  describe('when planState is Suspended', () => {
    const taskDetailsCompleted = { assignee: 'wilbur', planState: 'Suspended', taskState: 'Assigned' };
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetailsCompleted}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to Suspended', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Suspended');
    });

    it('should set children of <StatusCapsule /> to Suspended', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Suspended');
    });
  });

  describe('when planState is Failed', () => {
    const taskDetailsCompleted = { assignee: 'wilbur', planState: 'Failed', taskState: 'Assigned' };
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetailsCompleted}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop status of <StatusCapsule /> to Failed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).to.equal('Failed');
    });

    it('should set children of <StatusCapsule /> to Failed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).to.equal('Failed');
    });
  });
});
