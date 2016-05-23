export const getAvailableTransitions = (task) => {
  switch (task.planState) {
    case 'Suspended':
      return [
        {
          action: 'resume',
          label: 'resume',
          backgroundColor: 'olive'
        }
      ];

    case 'Active':
      return [
        {
          action: 'complete',
          label: 'complete',
          backgroundColor: 'olive'
        },
        {
          action: 'suspend',
          label: 'suspend',
          backgroundColor: 'orange'
        },
        {
          action: 'terminate',
          label: 'terminate',
          backgroundColor: 'red'
        }
      ];

    default:
      return [];
  }
};
