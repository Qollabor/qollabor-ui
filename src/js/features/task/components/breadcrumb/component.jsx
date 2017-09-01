import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '../../../../cafienne-ui-elements';

export class TaskBreadcrumbComponent extends React.Component {
  render() {
    return <Breadcrumb item={this.props.item} separator={'/'} />;
  }
}

TaskBreadcrumbComponent.propTypes = {
  item: React.PropTypes.shape({
    label: React.PropTypes.string,
    url: React.PropTypes.string,
    description: React.PropTypes.string
  })
};

export default TaskBreadcrumbComponent;
