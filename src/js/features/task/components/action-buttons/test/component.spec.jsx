import React from 'react';
import { shallow } from 'enzyme';
import { ActionAssignmentInd } from 'material-ui/svg-icons';
import { ActionButtons } from '../actionButtons';

const caseId = 'blah';
const taskId = '123';
const disabled = true;
const buttonDisabled = false;
const taskDetails = { assignee: 'wilbur', mappedInput: { dog: 'wilbur' }, planState: 'Active', taskState: 'Assigned' };
const availableTransitions = [
  {
    action: 'suspend',
    primaryText: 'Suspend',
    leftIcon: <ActionAssignmentInd />,
    transition: true
  },
  {
    action: 'terminate',
    primaryText: 'Terminate',
    leftIcon: <ActionAssignmentInd />,
    transition: true
  }
];

const actionItems = [
  {
    action: 'assign',
    primaryText: 'Assign',
    leftIcon: <ActionAssignmentInd />,
    transition: true
  },
  {
    action: 'suspend',
    primaryText: 'Suspend',
    leftIcon: <ActionAssignmentInd />,
    transition: true
  },
  {
    action: 'terminate',
    primaryText: 'Terminate',
    leftIcon: <ActionAssignmentInd />,
    transition: true
  }
];

describe('features/action-buttons/ActionButtons', () => {
  describe('<ActionButtons />', () => {
    it('should not render if props are not passed', () => {
      expect(shallow.bind(<ActionButtons />))
        .toThrow();
    });

    it('should not render if taskId prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          buttonDisabled={buttonDisabled}
          caseId={caseId}
          disabled={disabled}
          availableTransitions={availableTransitions}
          taskDetails={taskDetails}
        />))
        .toThrow();
    });

    it('should not render if caseId prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          buttonDisabled={buttonDisabled}
          taskId={taskId}
          disabled={disabled}
          availableTransitions={availableTransitions}
          taskDetails={taskDetails}
        />))
        .toThrow();
    });

    it('should not render if availableTransitions prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          buttonDisabled={buttonDisabled}
          taskId={taskId}
          caseId={caseId}
          disabled={disabled}
          taskDetails={taskDetails}
        />))
        .toThrow();
    });

    it('should not render if taskDetails prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          buttonDisabled={buttonDisabled}
          taskId={taskId}
          caseId={caseId}
          disabled={disabled}
          availableTransitions={availableTransitions}
        />))
        .toThrow();
    });

    it('should not render if buttonDisabled prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          taskDetails={taskDetails}
          taskId={taskId}
          caseId={caseId}
          disabled={disabled}
          availableTransitions={availableTransitions}
        />))
        .toThrow();
    });

    it('should not render if disabled prop is not passed', () => {
      expect(shallow.bind(
        <ActionButtons
          buttonDisabled={buttonDisabled}
          taskId={taskId}
          caseId={caseId}
          taskDetails={taskDetails}
          availableTransitions={availableTransitions}
        />))
        .toThrow();
    });
  });

  describe('when disabled prop is true', () => {
    const actionButtonsComponent = shallow(
      <ActionButtons
        buttonDisabled={buttonDisabled}
        disabled={true}
        taskId={taskId}
        caseId={caseId}
        taskDetails={taskDetails}
        availableTransitions={availableTransitions}
      />);

    it('should return true when isActionDisabled called for all actionItems ', () => {
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[0])).toEqual(true);
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[1])).toEqual(true);
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[2])).toEqual(true);
    });
  });

  describe('when disabled prop is false', () => {
    const actionButtonsComponent = shallow(
      <ActionButtons
        buttonDisabled={buttonDisabled}
        disabled={false}
        taskId={taskId}
        caseId={caseId}
        taskDetails={taskDetails}
        availableTransitions={availableTransitions}
      />);

    it('should return true when isActionDisabled called for all actionItems ', () => {
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[0])).toEqual(false);
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[1])).toEqual(false);
      expect(actionButtonsComponent.instance().isActionDisabled(actionItems[2])).toEqual(false);
    });
  });
});
