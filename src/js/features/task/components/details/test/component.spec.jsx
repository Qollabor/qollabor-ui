import React from 'react';
import { shallow } from 'enzyme';
import TaskModelSchemaForm from '../../schema-form';
import { StatusCapsule } from '../../../../../components/capsules';
import { ActionButtons } from '../../action-buttons';

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
        .toThrow();
    });

    it('should not render if taskDetails prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .toThrow();
    });

    it('should not render if caseId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          taskId={taskId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .toThrow();
    });

    it('should not render if taskId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          isFetching={isFetching}
          loggedInUserId={loggedInUserId}
        />))
        .toThrow();
    });

    it('should not render if isFetching prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          loggedInUserId={loggedInUserId}
        />))
        .toThrow();
    });

    it('should not render if loggedInUserId prop is not passed', () => {
      expect(shallow.bind(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />))
        .toThrow();
    });

    it('should set formData to taskDetails mappedInput if no rawOutput object', () => {
      expect(shallow(
        <TaskDetails
          taskDetails={taskDetails}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />).find(TaskModelSchemaForm).prop('formData')).toEqual(taskDetails.mappedInput);
    });

    it('should set formData to taskDetails to rawOutput if available', () => {
      expect(shallow(
        <TaskDetails
          taskDetails={taskDetailsRawOutput}
          caseId={caseId}
          taskId={taskId}
          isFetching={isFetching}
        />).find(TaskModelSchemaForm).prop('formData')).toEqual(taskDetailsRawOutput.rawOutput);
    });
  });

  describe('when task assignee is not the current user', () => {
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetails}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={loggedInUserId}
      />);

    it('should set prop disabled of <TaskModelSchemaForm /> to true', () => {
      expect(taskDetailsComponent.find(TaskModelSchemaForm).prop('disabled')).toEqual(true);
    });

    it('should set prop disabled of <ActionButtons /> to true', () => {
      expect(taskDetailsComponent.find(ActionButtons).prop('disabled')).toEqual(true);
    });
  });

  describe('when task assignee is the current user', () => {
    const taskDetailsComponent = shallow(
      <TaskDetails
        taskDetails={taskDetails}
        caseId={caseId}
        taskId={taskId}
        isFetching={isFetching}
        loggedInUserId={taskDetails.assignee}
      />);

    it('should set prop disabled of <TaskModelSchemaForm /> to false', () => {
      expect(taskDetailsComponent.find(TaskModelSchemaForm).prop('disabled')).toEqual(false);
    });

    it('should set prop disabled of <ActionButtons /> to false', () => {
      expect(taskDetailsComponent.find(ActionButtons).prop('disabled')).toEqual(false);
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Assigned');
    });

    it('should set children of <StatusCapsule /> to the taskState prop', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Assigned');
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Completed');
    });

    it('should set children of <StatusCapsule /> to Completed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Completed');
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Available');
    });

    it('should set children of <StatusCapsule /> to Available', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Available');
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Terminated');
    });

    it('should set children of <StatusCapsule /> to Terminated', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Terminated');
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Suspended');
    });

    it('should set children of <StatusCapsule /> to Suspended', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Suspended');
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
      expect(taskDetailsComponent.find(StatusCapsule).prop('status')).toEqual('Failed');
    });

    it('should set children of <StatusCapsule /> to Failed', () => {
      expect(taskDetailsComponent.find(StatusCapsule).props().children).toEqual('Failed');
    });
  });
});
