import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'fixed-data-table';
import ActionChooser from '../../../../task/components/action-chooser';

// ActionChooser cell
const ActionChooserCell = ({ rowIndex, cancelClick, ...props }) =>
  (<Cell onClick={cancelClick}>
    <ActionChooser {...props} rowIndex={rowIndex} iconStyle={{ height: 30, padding: 0 }} />
  </Cell>);

const cancelClick = (e) => {
  e.stopPropagation();
};

ActionChooserCell.propTypes = {
  items: PropTypes.array,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string,
  cancelClick: PropTypes.func
};

export { ActionChooserCell };
