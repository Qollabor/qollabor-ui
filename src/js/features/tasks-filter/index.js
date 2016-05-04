import component from './component';
import { connect } from 'react-redux';
export { reducers } from './reducers';

function mapStateToProps(state) {
  return {
    currentTasksFilter: state.tasksFilter.get('currentTasksFilter'),
    tasksFilterTypes: state.tasksFilter.get('tasksFilterTypes').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeTasksFilter: (tasksFilterName) => {
      dispatch({
        type: 'TASKS_FILTER:CHANGE',
        tasksFilterName
      });
    }
  };
}

export const TasksFilter = connect(mapStateToProps, mapDispatchToProps)(component);
