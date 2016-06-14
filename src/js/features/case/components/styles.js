import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme = getMuiTheme();

const baseTheme = {
  fontFamily: theme.baseTheme.fontFamily,
  color: theme.baseTheme.palette.textColor
};

export default {
  section: {
    marginBottom: '10px',
    paddingLeft: '10px'
  },
  title: Object.assign({}, baseTheme, {
    color: theme.baseTheme.palette.primary1Color
  }),
  label: Object.assign({}, {}, baseTheme)
};
