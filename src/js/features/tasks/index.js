import { connect } from 'react-redux';
import { TaskListLayout } from './taskListLayout';

export * from './sagas';

function mapStateToProps(state) {
  return {
    showDrawer: state.app.get('showDrawer')
  };
}

export const Tasks = connect(mapStateToProps, null)(TaskListLayout);
export { reducers } from './reducers';
