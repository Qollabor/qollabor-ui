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
  title: Object.assign({}, baseTheme, {
    color: theme.baseTheme.palette.primary1Color
  }),
  label: Object.assign({}, {}, baseTheme)
};
