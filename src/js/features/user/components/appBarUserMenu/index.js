import { connect } from 'react-redux';
import { AppBarUserMenu as AppBarUserMenuComponent } from './appBarUserMenu.jsx';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch({ type: 'USER:DO_LOGOUT' });
    }
  };
}

export const AppBarUserMenu = connect(mapStateToProps, mapDispatchToProps)(AppBarUserMenuComponent);

