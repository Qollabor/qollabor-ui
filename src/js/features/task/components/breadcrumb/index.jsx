import { connect } from 'react-redux';
import TaskBreadcrumbComponent from './component';

function mapStateToProps(state) {
  const taskId = state.task.get('taskDetails').get('id');
  const name = state.task.get('taskDetails').get('taskName');
  // const caseId = state.task.get('taskDetails').get('caseInstanceId');
  return {
    items: [
      {
        label: 'My Tasks',
        url: '#/',
        id: 'myTasksId'
      },
      {
        label: name,
        // url: `#/tasks/${taskId}?caseId=${caseId}`,
        id: taskId
      }
    ]
  };
}

export const TaskBreadcrumb = connect(mapStateToProps, null)(TaskBreadcrumbComponent);
