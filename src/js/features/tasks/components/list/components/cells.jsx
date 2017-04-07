import React from 'react';

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
  items: React.PropTypes.array,
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
  cancelClick: React.PropTypes.func
};

export { ActionChooserCell };
