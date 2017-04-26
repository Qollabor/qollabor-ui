import { connect } from 'react-redux';

import TaskComponent from './task';

function mapStateToProps(state) {
  return { showDrawer: state.app.get('showDrawer') };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (caseId) => {
      dispatch({ type: 'CASE:REQUEST_INIT', caseId });
    },
    onTaskChanged: (taskId) => {
      dispatch({ type: 'TASK:REQUEST_INIT', taskId });
    },
    onCaseChanged: (caseId) => {
      dispatch({ type: 'CASE:REQUEST_INIT', caseId });
    }
  };
}

const Task = connect(mapStateToProps, mapDispatchToProps)(TaskComponent);
export default Task;
