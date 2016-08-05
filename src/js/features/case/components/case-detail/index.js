import CaseDetailComponent from './caseDetail';
import { connect } from 'react-redux';
import registry from 'app-registry';

const mapDispatchToProps = (dispatch) => ({
  initCaseDocument: () => {
    const getParameterValuesFromHash = registry.get('helpers').getParameterValuesFromHash;
    const params = getParameterValuesFromHash('/cases/:id');
    dispatch({ type: 'CASE:REQUEST_INIT', caseId: params.id });
  }
});

function mapStateToProps(state) {
  return {
    caseDocument: state.case.case.toJS(),
    discretionaryItems: state.case.discretionaryItems.toJS(),
    caseTeam: state.case.caseTeam.toJS()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetailComponent);
