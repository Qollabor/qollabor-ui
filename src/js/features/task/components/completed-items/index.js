import { connect } from 'react-redux';

import CompletedItemsComponent from './component';

function mapStateToProps(state, props) {
  return {
    isFetching: state.case.completedTasks.get('isFetching'),
    completedTasks: state.case.completedTasks.get('items')
      .filter(completedTask => completedTask.get('id') !== props.taskId)
      .map(
        (completedTask) => Object.assign({}, completedTask.toJS(), {
          color: completedTask.getIn(['viewInternalData', 'iconStyle', 'color']),
          icon: completedTask.getIn(['viewInternalData', 'icon']),
          url: `/#/tasks/${completedTask.get('id')}?caseId=${completedTask.get('caseInstanceId')}`
        })
      ).toJS(),
    error: state.case.completedTasks.get('error').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickTaskListItem: (caseId, taskId) => {
      dispatch({ type: 'TASK:TASKLIST:VIEW_TASK', taskId, caseId });
    }
  };
}

export const CompletedItems = connect(mapStateToProps, mapDispatchToProps)(CompletedItemsComponent);
