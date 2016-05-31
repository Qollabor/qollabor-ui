/**
 * Created by andreasoldino on 5/4/16.
 */

import { ThemeManager } from 'material-ui/lib/styles';

const theme = ThemeManager.getMuiTheme();

export default {
  cell: {
    cursor: 'pointer'
  },
  table: {
    padding: '0 24px',
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.table.backgroundColor,
    tableLayout: 'fixed'
  },
  tableHeader: {
    borderBottom: '1px solid',
    borderColor: theme.tableHeader.borderColor,
    fontWeight: 'normal',
    fontSize: '12px'
  },
  tableHeaderColumn: {
    padding: '0 6px',
    fontWeight: 'normal',
    textAlign: 'left',
    fontSize: '12px',
    height: theme.tableHeaderColumn.height,
    cellSpacing: theme.tableHeaderColumn.spacing,
    color: theme.tableHeaderColumn.textColor,
    textOverflow: 'ellipsis'
  },
  tableRow: {
    borderBottom: '1px solid',
    borderColor: theme.tableHeader.borderColor,
    color: theme.tableRow.textColor,
    cursor: 'pointer'
  },
  tableRowColumn: {
    padding: '0 6px',
    textAlign: 'left',
    fontSize: '13px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    backgroundColor: 'inherit'
  }
};
