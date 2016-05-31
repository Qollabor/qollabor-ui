import { Cell } from 'fixed-data-table';
import { FontIcon } from 'material-ui';
import React from 'react';

export const IconCell = ({ rowIndex, data, handleRowClick, onRowClick }) => (
  <Cell
    onClick={handleRowClick.bind(this,
    data[rowIndex].id,
    data[rowIndex].caseInstanceId,
    onRowClick)}
  >
    <FontIcon
      className="material-icons"
      style={data[rowIndex].viewInternalData.iconStyle}
    >{data[rowIndex].viewInternalData.icon}</FontIcon>
  </Cell>
);

export const TextCell = ({ rowIndex, data, col, handleRowClick, onRowClick }) => {
  let cellData = '';
  if (data[rowIndex] !== undefined) {
    cellData = data[rowIndex][col];
  }

  return (
    <Cell
      onClick={handleRowClick.bind(this,
      data[rowIndex].id,
      data[rowIndex].caseInstanceId,
      onRowClick)}
    >
      {cellData}
    </Cell>
  );
};

export const MoreOptionsCell = ({ rowIndex, data, handleRowClick, onRowClick }) => (
  <Cell
    onClick={handleRowClick.bind(this,
    data[rowIndex].id,
    data[rowIndex].caseInstanceId,
    onRowClick)}
  >
    <FontIcon className="material-icons">more_vert</FontIcon>
  </Cell>
);
