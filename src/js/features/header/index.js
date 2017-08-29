import { connect } from 'react-redux';
import { Header as HeaderComponent } from './header';

function mapStateToProps(state) {
  return {
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
