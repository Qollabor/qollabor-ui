import { connect } from 'react-redux';

import TaskListComponent from './component';

function mapDispatchToProps(dispatch) {
  return {
    onClickTaskListItem: (caseId, taskId) => {
      dispatch({ type: 'TASK:TASKLIST:VIEW_TASK', taskId, caseId });
    }
  };
}

export const TaskList = connect(null, mapDispatchToProps)(TaskListComponent);
