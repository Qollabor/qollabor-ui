import React from 'react';
import { Cell } from 'fixed-data-table';
import renderers from './renderers';
import { ActionSelector } from './actionSelector';

import { FontIcon } from 'material-ui';
import { getLocalDateTime, getLocalDateObj, getTimeRemaining, getElapsedTime } from './utils/dateUtils';


// Stateless cell components for Table component

// Header cell
const SortHeaderCell = ({ children, columnKey, sortBy, sortKey, sortDesc }) => {
  const clickFunc = () => sortBy && sortBy(columnKey);
  return (
    <Cell>
      <a onClick={clickFunc}>
        {children} {renderers.renderSortArrow(sortKey, sortDesc, columnKey)}
      </a>
    </Cell>
  );
};

SortHeaderCell.propTypes = {
  sortBy: React.PropTypes.func.isRequired,
  sortDesc: React.PropTypes.bool,
  sortKey: React.PropTypes.string,
  columnKey: React.PropTypes.string,
  children: React.PropTypes.any
};

// Data cell
const DataCell = ({ items, rowIndex, columnKey, mapper }) => {
  const data = items[rowIndex][columnKey];
  return (<Cell title={mapper && data}>
    {mapper ? mapper(data) : data}
  </Cell>);
};

DataCell.propTypes = {
  items: React.PropTypes.array,
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string,
  mapper: React.PropTypes.func
};

// Date cell
const DateCell = ({ items, type, dateFormat, rowIndex, columnKey }) => {
  const cellData = items[rowIndex][columnKey];
  const localDate = getLocalDateObj(cellData, dateFormat);

  let value;
  let title;
  // If date type is timeRem, set the remaining time, else set time elapsed.
  if (type === 'timeRem') {
    value = getTimeRemaining(cellData).rem;
    title = localDate;
  } else {
    value = getElapsedTime(localDate);
    title = getLocalDateTime(cellData, dateFormat);
  }

  return <Cell title={title}>{value}</Cell>;
};

DateCell.propTypes = {
  dateFormat: React.PropTypes.string,
  type: React.PropTypes.string,
  items: React.PropTypes.array,
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string
};

// CheckBox cell
const CheckBoxCell = ({ items, rowIndex, columnKey }) =>
  (<Cell><input type="checkbox" checked={items[rowIndex][columnKey]} disabled="disabled" /></Cell>);

CheckBoxCell.propTypes = {
  items: React.PropTypes.array,
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string
};

// ActionChooser cell
const ActionChooserCell = ({ rowIndex }) =>
  (<Cell onClick={cancelClick}>
    <ActionSelector rowIndex={rowIndex} />
  </Cell>);

ActionChooserCell.propTypes = {
  rowIndex: React.PropTypes.number
};

const cancelClick = (e) => {
  e.stopPropagation();
};

// Status cell
const StatusCell = ({ items, rowIndex }) => {
  const cellData = items[rowIndex];
  return (<Cell>
    <FontIcon
      className="material-icons"
      style={cellData.viewInternalData.iconStyle}
    >{cellData.viewInternalData.icon}
    </FontIcon>
  </Cell>);
};

StatusCell.propTypes = {
  items: React.PropTypes.array,
  rowIndex: React.PropTypes.number
};

export { SortHeaderCell, DataCell, DateCell, CheckBoxCell, ActionChooserCell, StatusCell };
