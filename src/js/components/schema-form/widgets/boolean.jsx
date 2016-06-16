import React from 'react';

import { Checkbox } from 'material-ui';

export class BooleanWidget extends React.Component {
  handleOnCheck(event) {
    event.persist();
    this.props.onChange(event.target.checked);
  }

  render() {
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

    let disabled = {};
    if (this.props.readonly) {
      disabled = { disabled: true };
    }

    return (
      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        <Checkbox
          name={this.props.name}
          label={this.props.schema.title}
          onCheck={this.handleOnCheck.bind(this)}
          checked={this.props.formData}
          {...errors}
          {...disabled}
        />
      </div>);
  }
}
