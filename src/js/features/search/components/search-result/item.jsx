import React from 'react';
import PropTypes from 'prop-types';
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
  itemType: PropTypes.string.isRequired,
  score: PropTypes.number,
  item: PropTypes.object
};
