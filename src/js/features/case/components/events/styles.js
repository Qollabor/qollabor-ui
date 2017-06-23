import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme();

const baseTheme = {
  fontFamily: theme.baseTheme.fontFamily,
  color: theme.baseTheme.palette.textColor
};

export default {
  icon: {
    color: 'rgb(56, 138, 195)',
    display: 'table-cell',
    verticalAlign: 'top',
    paddingRight: '5px'
  },
  section: {
    marginBottom: '10px',
    paddingLeft: '10px'
  },
  legend: Object.assign({}, baseTheme, {
    lineHeight: '2em',
    color: 'grey'
  }),
  noTask: {
    fontStyle: 'italic',
    fontSize: '13px',
    color: 'red'
  },
  rowLabel: { display: 'table-cell', verticalAlign: 'middle', paddingTop: '2px' }
};
