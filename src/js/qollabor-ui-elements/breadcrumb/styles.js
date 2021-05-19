import theme from '../../themes';

export default {
  separator: {
    fontWeight: 'bold',
    marginLeft: '5px',
    marginRight: '5px',
    color: theme.appBar.textColor,
    fontFamily: theme.fontFamily
  },
  itemUrl: {
    textDecoration: 'none',
    color: theme.appBar.textColor,
    fontFamily: theme.fontFamily,
    ':hover': {
      textDecoration: 'underline'
    }
  },
  itemNoUrl: {
    color: theme.appBar.textColor,
    fontFamily: theme.fontFamily
  }
};
