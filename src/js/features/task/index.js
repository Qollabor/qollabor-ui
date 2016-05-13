import { connect } from 'react-redux';
import TaskLayout from './taskLayout';

function mapStateToProps(state) {
  return {
    showLeftNav: state.app.get('showLeftNav')
  };
}

export const Task = connect(mapStateToProps, null)(TaskLayout);
export { reducers } from './reducers';
export * from './sagas';
