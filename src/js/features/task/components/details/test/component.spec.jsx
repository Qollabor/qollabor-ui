import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import TaskModelSchemaForm from '../../schema-form';

import TaskDetails from '../taskDetails';

const caseId = 'blah';
const taskId = '123';
const isFetching = false;
const loggedInUserId = 'admin';
const taskDetails = { assignee: 'wilbur', mappedInput: { dog: 'wilbur' } };
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
});
