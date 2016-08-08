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
    color: 'grey'
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
  },
  readOnly: {
    container: Object.assign({}, defaultFieldStyle, {
      lineHeight: '24px',
      width: '100%',
      height: '50px',
      display: 'inline-block',
      position: 'relative',
      backgroundColor: 'transparent'
    }),
    label: Object.assign({}, defaultLabelStyle, {
      position: 'absolute',
      lineHeight: '22px',
      top: '18px',
      zIndex: 1,
      cursor: 'text',
      transform: 'perspective(1px) scale(0.85) translate3d(0px, -28px, 0px)',
      transformOrigin: 'left top 0px',
      color: 'rgba(0, 0, 0, 0.498039)'
    }),
    content: {
      padding: '0px',
      position: 'relative',
      width: '100%',
      height: '30px',
      border: 'none',
      outline: 'none',
      color: 'rgba(0, 0, 0, 0.870588)',
      boxSizing: 'border-box',
      marginTop: '14px',
      top: '-2px',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  }
};
