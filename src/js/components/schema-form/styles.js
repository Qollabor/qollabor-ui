import theme from '../../themes';

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
  }),
  refreshContainer: {
    position: 'relative',
    height: '50px',
    width: '50px',
    margin: '10px auto'
  },
  readOnly: {
    container: {
      fontSize: '16px',
      lineHeight: '24px',
      width: '100%',
      height: '50px',
      display: 'inline-block',
      position: 'relative',
      backgroundColor: 'transparent'
    },
    label: {
      position: 'absolute',
      lineHeight: '22px',
      top: '18px',
      zIndex: 1,
      cursor: 'text',
      transform: 'perspective(1px) scale(0.75) translate3d(0px, -28px, 0px)',
      transformOrigin: 'left top 0px',
      color: 'rgba(0, 0, 0, 0.498039)'
    },
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
