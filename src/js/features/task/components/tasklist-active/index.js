import { connect } from 'react-redux';

import ActiveTasksComponent from './component';

function mapStateToProps(state, props) {
  return {
    isFetching: state.case.activeTasks.get('isFetching'),
    activeTasks: state.case.activeTasks.get('items')
      .filter(activeTask => activeTask.get('id') !== props.taskId)
      .map(
        (activeTask) => Object.assign({}, activeTask.toJS(), {
          color: activeTask.getIn(['viewInternalData', 'iconStyle', 'color']),
          icon: activeTask.getIn(['viewInternalData', 'icon']),
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
