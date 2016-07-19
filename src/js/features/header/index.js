import { Header as HeaderComponent } from './header';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    menuItemCategory: state.app.get('menuItemCategory'),
    showCaseUsers: state.app.get('showCaseUsers'),
    headerMenu: state.app.get('headerMenu'),
    caseTeam: state.case.case.get('item').caseTeam,
    showDrawer: state.app.get('showDrawer')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLeftNavToggle: () => {
      dispatch({ type: 'APP:LEFT_NAV:TOGGLE' });
    }
  };
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
