import React from 'react';
import CaseItem from './caseItem';
import TaskItem from './taskItem';

export const Item = (props) => {
  switch (props.itemType) {
    case 'case':
      return <CaseItem {...props} />;
    case 'tasks':
      return <TaskItem {...props} />;
    default:
      return '';
  }
};
Item.propTypes = {
  itemType: React.PropTypes.string.isRequired,
  score: React.PropTypes.number,
  item: React.PropTypes.object
};
