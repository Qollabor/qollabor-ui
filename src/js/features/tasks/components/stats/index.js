import TaskStats from './stats';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    taskStats: state.tasks.stats.get('stats'),
    isFetching: state.tasks.stats.get('isFetching'),
    error: state.tasks.stats.get('error').toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => {
      dispatch({ type: 'TASK:STATS:REQUEST_INIT' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskStats);
