import theme from '../../../themes';

const baseTheme = {
  fontFamily: theme.baseTheme.fontFamily,
  color: theme.baseTheme.palette.textColor
};

export default {
  section: {
    marginBottom: '10px',
    paddingLeft: '10px'
  },
  legend: Object.assign({}, baseTheme, {
    lineHeight: '2em',
    color: 'grey'
  }),
  title: Object.assign({}, baseTheme, {
    color: theme.baseTheme.palette.primary1Color
  }),
  label: Object.assign({}, {}, baseTheme),
  error: Object.assign({}, baseTheme, {
    color: theme.textField.errorColor,
    fontSize: '12px'
  })
};
