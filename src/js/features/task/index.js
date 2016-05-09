import { connect } from 'react-redux';
import TaskLayout from './taskLayout';

function mapStateToProps(state) {
  return {
    showLeftNav: state.app.get('showLeftNav')
  };
}

export const Task = connect(mapStateToProps, null)(TaskLayout);
export { sagas } from './sagas';
export { reducers } from './reducers';
