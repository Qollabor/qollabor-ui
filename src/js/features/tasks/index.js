export * from './sagas';

import { TaskListLayout } from './taskListLayout.jsx';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    showLeftNav: state.app.get('showLeftNav')
  };
}

export const Tasks = connect(mapStateToProps, null)(TaskListLayout);
export { reducers } from './reducers';
