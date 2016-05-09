import component from './component';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    currentTasksFilter: state.tasks.filters.get('currentTasksFilter'),
    tasksFilterTypes: state.tasks.filters.get('tasksFilterTypes').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeTasksFilter: (tasksFilterName) => {
      dispatch({
        type: 'TASKS:FILTERS:CHANGE',
        tasksFilterName
      });
    }
  };
}

export const TasksFilter = connect(mapStateToProps, mapDispatchToProps)(component);
