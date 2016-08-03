import TaskStats from './taskStats';
import { connect } from 'react-redux';

let myTasks = [];
function mapStateToProps(state) {
  /* TODO: Get tasks count from all task list for now.
     Need to create a seperate API to get count of claimed tasks and unclaimed tasks list
  */
  const currentTasksFilter = state.tasks.filters.getIn(['currentTasksFilter', 'id']);
  const isFetchingTasksList = state.tasks.list.get('isFetching');
  if (currentTasksFilter === 'myTasks' && isFetchingTasksList === false) {
    myTasks = state.tasks.list.get('items').toJS();
  }

  return {
    taskStats: myTasks ? myTasks.length : 0
  };
}

export default connect(mapStateToProps, null)(TaskStats);
