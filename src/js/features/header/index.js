import { Header as HeaderComponent } from './header';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    menuItemCategory: state.app.get('menuItemCategory'),
    showCaseUsers: state.app.get('showCaseUsers'),
    caseTeam: state.case.case.get('item').caseTeam
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
