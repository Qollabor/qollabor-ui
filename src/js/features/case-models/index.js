import CaseModels from './caseModels';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  initCaseModels: () => {
    dispatch({ type: 'CASEMODEL:LIST:INIT' });
  }
});

export default connect(null, mapDispatchToProps)(CaseModels);
export { reducers } from './reducers';
export * from './sagas';
