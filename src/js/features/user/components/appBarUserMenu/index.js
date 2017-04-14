import { connect } from 'react-redux';
import { AppBarUserMenu as AppBarUserMenuComponent } from './appBarUserMenu';

const mapStateToProps = state => state.user.toJS();

function mapDispatchToProps(dispatch) {
  return {
    init: () => {
      dispatch({ type: 'USER:PROFILE:INIT' });
    },
    onLogout: () => {
      dispatch({ type: 'USER:DO_LOGOUT' });
    }
  };
}

export const AppBarUserMenu = connect(mapStateToProps, mapDispatchToProps)(AppBarUserMenuComponent);

