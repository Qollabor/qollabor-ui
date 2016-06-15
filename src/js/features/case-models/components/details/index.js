import Details from './details';
import { connect } from 'react-redux';
import registry from 'app-registry';

const mapDispatchToProps = (dispatch) => ({
  initDetails: () => {
    const helpers = registry.get('helpers');
    const definition = helpers.casemodel.getParameterValuesFromHash('/casemodel/:definition').definition;

    const name = definition.substr(0, definition.lastIndexOf('.'));
    dispatch({ type: 'CASEMODEL:DETAIL:INIT', definition, name });
  },
  startCaseModel: () => {
    dispatch({ type: 'CASEMODEL:START' });
  },
  resetDetails: () => {
    dispatch({ type: 'CASEMODEL:DETAIL:RESET' });
  }
});

const mapStateToProps = (state) => ({
  isFetching: state.casemodel.details.get('isFetching'),
  definition: state.casemodel.details.get('definition'),
  data: state.casemodel.details.get('data'),
  error: state.casemodel.details.get('error').toJS(),
  actionError: state.casemodel.details.get('actionError').toJS(),
  showFeedbackForm: state.casemodel.details.get('showFeedbackForm')
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
