import Details from './details';
import { connect } from 'react-redux';
import registry from 'app-registry';

const mapDispatchToProps = dispatch => ({
  initDetails: () => {
    const helpers = registry.get('helpers');
    const definition = helpers.casemodel.getParameterValuesFromHash('/casemodel/:definition').definition;

    const name = definition.substr(0, definition.lastIndexOf('.'));
    dispatch({ type: 'CASEMODEL:DETAIL:INIT', definition, name });
  },
  startCaseModel: (caseData) => {
    dispatch({ type: 'CASEMODEL:START', caseData });
  },
  resetDetails: () => {
    dispatch({ type: 'CASEMODEL:DETAIL:RESET' });
  }
});

const mapStateToProps = state => ({
  isFetching: state.casemodel.details.get('isFetching'),
  definition: state.casemodel.details.get('definition'),
  data: state.casemodel.details.get('data'),
  caseData: state.casemodel.details.get('caseData'),
  caseModelSchema: state.casemodel.details.get('caseModelSchema'),
  error: state.casemodel.details.get('error').toJS(),
  actionError: state.casemodel.details.get('actionError').toJS(),
  showFeedbackForm: state.casemodel.details.get('showFeedbackForm'),
  caseId: state.casemodel.details.get('caseId'),
  caseLastModified: state.casemodel.details.get('caseLastModified')
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
