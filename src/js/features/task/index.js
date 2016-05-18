import { connect } from 'react-redux';
import TaskLayout from './taskLayout';

function mapStateToProps(state) {
  return {
    showLeftNav: state.app.get('showLeftNav')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (caseId) => {
      dispatch({ type: 'CASE:REQUEST_INIT', caseId });
    }
  };
}

export const Task = connect(mapStateToProps, mapDispatchToProps)(TaskLayout);
export { reducers } from './reducers';
export * from './sagas';
