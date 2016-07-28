import theme from '../../themes';

const drawerWidth = (theme.rightDrawer && theme.rightDrawer.width) || theme.drawer.width;
const headerHeight = theme.appBar.height;

export default {
  leftNav: {
    marginTop: headerHeight,
    padding: `5px 5px ${headerHeight} 5px`,
    width: drawerWidth,
    paddingLeft: 10
  },
  detailsContainer: {
    paddingLeft: '25px',
    paddingTop: '25px',
    marginTop: '25px',
    height: '100%',
    minHeight: '400px'
  }
};
