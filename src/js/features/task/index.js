import { connect } from 'react-redux';

import { getAvailableTransitions } from './helpers/availableTransitions';
import { TaskTransitions as TaskTransitionsComponent } from './components/task-transition';
import TaskLayout from './taskLayout';

function mapStateToProps(state) {
  return {
    showLeftNav: state.app.get('showLeftNav')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: (caseId) => {
      dispatch({ type: 'CASE:REQUEST_INIT', caseId });
    },
    onTaskChanged: (taskId) => {
      dispatch({ type: 'TASK:REQUEST_INIT', taskId });
    },
    onCaseChanged: (caseId) => {
      dispatch({ type: 'CASE:REQUEST_INIT', caseId });
    }
  };
}

function mapTransitionsStateToProps(state) {
  return {
    buttonsDisabled: state.task.getIn(['transition', 'onGoing']),
    availableTransitions: getAvailableTransitions(state.task.get('taskDetails').toJS())
  };
}

function mapTransitionsDispatchToProps(dispatch) {
  return {
    onButtonClick: (taskId, caseId, transition) => {
      dispatch({ type: 'TASK:REQUEST_TRANSITION', taskId, caseId, transition });
    }
  };
}

export { reducers } from './reducers';
export * from './sagas';

export const Task = connect(mapStateToProps, mapDispatchToProps)(TaskLayout);
export const TaskTransitions =
  connect(mapTransitionsStateToProps, mapTransitionsDispatchToProps)(TaskTransitionsComponent);
