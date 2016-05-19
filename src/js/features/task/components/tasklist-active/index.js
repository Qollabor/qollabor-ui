import { connect } from 'react-redux';

import ActiveTasksComponent from './component';

function mapStateToProps(state) {
  return {
    isFetching: state.case.activeTasks.get('isFetching'),
    activeTasks: state.case.activeTasks.get('items') ? state.case.activeTasks.get('items').map(
      (activeTask) => Object.assign({}, activeTask, {
        color: '#388AC3',
        icon: 'view_list'
      })
    ) : [],
    error: state.case.activeTasks.get('error')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickTaskListItem: (caseId, taskId) => {
      dispatch({ type: 'TASK:TASKLIST:VIEW_TASK', taskId, caseId });
    }
  };
}

export const ActiveTasks = connect(mapStateToProps, mapDispatchToProps)(ActiveTasksComponent);
