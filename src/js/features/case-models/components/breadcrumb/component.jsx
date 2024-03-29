import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from '../../../../cafienne-ui-elements';

export class CaseModelBreadcrumbComponent extends React.Component {
  render() {
    return (
      <div style={{ margin: 15 }}>
        <Breadcrumb items={this.props.items} separator={'>'} />
      </div>
    );
  }
}

CaseModelBreadcrumbComponent.propTypes = {
  items: PropTypes.array.isRequired
};

export default CaseModelBreadcrumbComponent;
