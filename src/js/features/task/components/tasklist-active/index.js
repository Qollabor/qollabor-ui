import { connect } from 'react-redux';

import ActiveTasksComponent from './component';

function mapStateToProps(state, props) {
  return {
    isFetching: state.case.activeTasks.get('isFetching'),
    activeTasks: state.case.activeTasks.get('items')
      .filter(activeTask => activeTask.get('id') !== props.taskId)
      .map(
        (activeTask) => Object.assign({}, activeTask.toJS(), {
          color: '#388AC3',
          icon: 'view_list',
          url: `/#/tasks/${activeTask.get('id')}?caseId=${activeTask.get('caseInstanceId')}`
        })
      ).toJS(),
    error: state.case.activeTasks.get('error').toJS()
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
