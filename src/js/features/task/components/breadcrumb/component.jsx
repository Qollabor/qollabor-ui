import React from 'react';
import { Breadcrumb } from '../../../../cafienne-ui-elements';

export class TaskBreadcrumbComponent extends React.Component {
  render() {
    return (
      <Breadcrumb items={this.props.items} separator={'/'} />
    );
  }
}

TaskBreadcrumbComponent.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default TaskBreadcrumbComponent;
