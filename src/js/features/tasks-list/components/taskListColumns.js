import { Cell, Column } from 'fixed-data-table';
import React from 'react';
import { IconCell, TextCell, MoreOptionsCell } from './taskListCells';
import { RefreshIndicator } from 'material-ui';

/* colspan-like feature is not available in fixed-data-table.
   therefore, we cannot show the avaialable columns when no items found. */
export const messageColumn = (message) => (
  <Column
    key={0}
    header={<Cell>Alert</Cell>}
    flewgrow={2}
    width={1000}
    cell={<Cell>{message}</Cell>}
  />
);

const divStyle = { position: 'relative', height: '50px', width: '50px', margin: '0px auto' };

export const loaderColumn = (
  <Column
    key={0}
    header={<Cell>Loading</Cell>}
    flewgrow={2}
    width={1000}
    cell={
      <Cell style={divStyle}>
        <RefreshIndicator
          size={30}
          left={5}
          top={5}
          status="loading"
        />
      </Cell>}
  />
);

export const iconColumn = (tasks, handleRowClick, onRowClick) => (
  <Column
    key={0}
    flewgrow={0}
    width={40}
    cell={<IconCell
      data={tasks}
      handleRowClick={handleRowClick}
      onRowClick={onRowClick}
    />}
  />
);

export const taskColumns = (columns, tasks, handleRowClick, onRowClick) => columns
  .map((columnDefinition) => (
    <Column
      key={columnDefinition.key}
      header={<Cell>{columnDefinition.label}</Cell>}
      cell={<TextCell
        data={tasks}
        col={columnDefinition.key}
        handleRowClick={handleRowClick}
        onRowClick={onRowClick}
      />}
      flexGrow={2}
      width={90}
    />
  ));

export const moreOptionsColumn = (tasks, handleRowClick, onRowClick) => (
  <Column
    key={0}
    flewgrow={0}
    width={50}
    cell={<MoreOptionsCell
      data={tasks}
      handleRowClick={handleRowClick}
      onRowClick={onRowClick}
    />}
  />
);
