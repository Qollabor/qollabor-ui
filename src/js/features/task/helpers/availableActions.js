export const getAvailableActions = (task) => {
  switch (task.taskState) {
    case 'Unassigned':
      return [
        {
          action: 'claim',
          label: 'claim',
          backgroundColor: 'olive'
        }
      ];
    case 'Assigned':
      return [
        {
          action: 'revoke',
          label: 'revoke',
          backgroundColor: '#F52887'
        }
      ];

    default: return [];
  }
};
