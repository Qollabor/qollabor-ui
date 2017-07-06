import { connect } from 'react-redux';
import TaskBreadcrumbComponent from './component';

function mapStateToProps(state) {
  return {
    item: state.app.get('breadcrumbItem')
  };
}

export const TaskBreadcrumb = connect(mapStateToProps, null)(TaskBreadcrumbComponent);
