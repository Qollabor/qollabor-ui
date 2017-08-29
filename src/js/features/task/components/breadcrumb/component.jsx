import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '../../../../cafienne-ui-elements';

export class TaskBreadcrumbComponent extends React.Component {
  render() {
    return (
      <Breadcrumb items={this.props.items} separator={'/'} />
    );
  }
}

TaskBreadcrumbComponent.propTypes = {
  items: PropTypes.array.isRequired
};

export default TaskBreadcrumbComponent;
