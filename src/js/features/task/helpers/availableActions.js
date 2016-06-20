export const getAvailableActions = (task) => {
  switch (task.taskState) {
    case 'Unassigned':
      return [
        {
          action: 'claim',
          label: 'claim',
          backgroundColor: 'olive'
        },
        {
          action: 'assign',
          label: 'assign',
          backgroundColor: 'orange'
        },
        {
          action: 'revoke',
          label: 'revoke',
          backgroundColor: '#F52887',
          disabled: true
        },
        {
          action: 'delegate',
          label: 'delegate',
          backgroundColor: '#00bcd4',
          disabled: true
        }
      ];
    case 'Assigned':
      return [
        {
          action: 'claim',
          label: 'claim',
          backgroundColor: 'olive',
          disabled: true
        },
        {
          action: 'assign',
          label: 'assign',
          backgroundColor: 'orange',
          disabled: true
        },
        {
          action: 'revoke',
          label: 'revoke',
          backgroundColor: '#F52887'
        },
        {
          action: 'delegate',
          label: 'delegate',
          backgroundColor: '#00bcd4'
        }
      ];

    default: return [];
  }
};
