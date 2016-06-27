import component from './component';
import moment from 'moment';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    currentTasksFilter: state.tasks.filters.getIn(['currentTasksFilter', 'id']),
    tasksFilterTypes: state.tasks.filters.get('tasksFilterTypes').toJS(),
    isFetchingTasksList: state.tasks.list.get('isFetching')
  };
}

function mapDispatchToProps(dispatch) {
  const timeZoneOffset = moment().format('Z');
  return {
    onChangeTasksFilter: (tasksFilterName) => {
      dispatch({
        type: 'TASKS:FILTERS:CHANGE',
        tasksFilterName,
        timeZone: timeZoneOffset

      });
    }
  };
}

export const TasksFilter = connect(mapStateToProps, mapDispatchToProps)(component);
