import React from 'react';
import { ActionAssignmentInd } from 'material-ui/svg-icons';

export const getAvailableTransitions = (task) => {
  switch (task.planState) {
    case 'Suspended':
      return [
        {
          action: 'resume',
          primaryText: 'Resume',
          leftIcon: <ActionAssignmentInd />,
          transition: true
        }
      ];

    case 'Active':
      return [
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

    default:
      return [];
  }
};
