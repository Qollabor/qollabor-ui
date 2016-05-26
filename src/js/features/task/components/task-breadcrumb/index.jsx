import { connect } from 'react-redux';
import TaskBreadCrumbComponent from './component';

function mapStateToProps(state) {
  const taskId = state.task.get('taskDetails').get('id');
  const taskName = state.task.get('taskDetails').get('taskName');
  const caseId = state.task.get('taskDetails').get('caseInstanceId');
  return {
    items: [
      {
        label: 'My Tasks',
        url: '#/',
        id: 'myTasksId'
      },
      {
        label: taskName,
        url: `#/tasks/${taskId}?caseId=${caseId}`,
        id: taskId
      }
    ]
  };
}

export const TaskBreadCrumb = connect(mapStateToProps, null)(TaskBreadCrumbComponent);
