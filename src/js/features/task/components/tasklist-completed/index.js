import { connect } from 'react-redux';

import CompletedTasksComponent from './component';

function mapStateToProps(state) {
  return {
    isFetching: state.case.completedTasks.get('isFetching'),
    completedTasks: state.case.completedTasks.get('items') ? state.case.completedTasks.get('items').map(
      (completedTask) => Object.assign({}, completedTask, {
        color: '#388AC3',
        icon: 'done'
      })
    ) : [],
    error: state.case.completedTasks.get('error')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickTaskListItem: (caseId, taskId) => {
      dispatch({ type: 'TASK:TASKLIST:VIEW_TASK', taskId, caseId });
    }
  };
}

export const CompletedTasks = connect(mapStateToProps, mapDispatchToProps)(CompletedTasksComponent);
