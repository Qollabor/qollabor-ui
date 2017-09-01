import theme from '../../themes';

const baseTheme = {
  fontFamily: theme.baseTheme.fontFamily,
  color: theme.baseTheme.palette.textColor
};

const defaultFieldStyle = Object.assign({}, baseTheme, {
  fontSize: 14
});

const defaultErrorLabelStyle = Object.assign({}, baseTheme, {
  fontSize: 11,
  float: 'right',
  color: theme.textField.errorColor,
  transform: 'translate3d(0px, -5px, 0px)'
});

const defaultLabelStyle = Object.assign({}, baseTheme, {
  fontSize: 14,
  color: 'gray',
  transform: 'perspective(1px) scale(0.85) translate3d(0px, -25px, 0px)'
});

export default {
  section: {
    marginBottom: '10px',
    paddingLeft: '10px'
  },
  legend: Object.assign({}, baseTheme, {
    lineHeight: '2em',
    color: 'black'
  }),
  title: Object.assign({}, baseTheme, {
    color: theme.baseTheme.palette.primary1Color
  }),
  field: defaultFieldStyle,
  floatingLabel: defaultLabelStyle,
  errorLabel: defaultErrorLabelStyle,
  error: Object.assign({}, baseTheme, {
    color: theme.textField.errorColor,
    fontSize: '12px'
  }),
  radioButton: {
    width: 'auto',
    padding: '5px'
  },
  refreshContainer: {
    position: 'relative',
    height: '50px',
    width: '50px',
    margin: '10px auto'
  }
};
