import React from 'react';
import { TextField } from 'material-ui';

export class IntegerWidget extends React.Component {
  handleOnChange(event) {
    event.persist();
    this.props.onChange(event.target.value);
  }

  render() {
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */
    errors.errorText = 'test';
    return (
      <TextField
        type="number"
        floatingLabelText={this.props.name}
        value={this.props.formData}
        onChange={this.handleOnChange.bind(this)}
        {...errors}
      />);
  }
}
