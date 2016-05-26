import React from 'react';
import BreadCrumb from '../../../../components/breadcrumb';

export class TaskBreadCrumbComponent extends React.Component {
  render() {
    return (
      <BreadCrumb items={this.props.items} separator={'/'} />
    );
  }
}

TaskBreadCrumbComponent.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default TaskBreadCrumbComponent;
