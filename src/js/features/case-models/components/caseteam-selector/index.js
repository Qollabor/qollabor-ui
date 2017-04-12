import CaseTeamSelector from './caseTeamSelector';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  roles: state.casemodel.caseTeam.get('roles').toJS()
});

const mapDispatchToProps = dispatch => ({
  initCaseTeam: (roles) => {
    dispatch({ type: 'CASETEAM_SELECTOR:SETROLES', roles });
  },
  setUsersForCaseTeamRoles: (role, user, selected) => {
    dispatch({ type: 'CASETEAM_SELECTOR:SETUSERSFORROLE', role, user, selected });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CaseTeamSelector);
