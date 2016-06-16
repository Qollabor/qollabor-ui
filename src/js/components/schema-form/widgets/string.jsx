import React from 'react';
import { TextField } from 'material-ui';
import { DateWidget } from './date';
import { TimeWidget } from './time';
import { SelectWidget } from './select';

export class StringWidget extends React.Component {
  handleOnChange(event) {
    event.persist();
    this.props.onChange(event.target.value);
  }

  render() {
    if (this.props.schema.format === 'date') {
      return <DateWidget {...this.props}/>;
    }

    if (
      this.props.schema.format === 'time' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'time')
    ) {
      return <TimeWidget {...this.props}/>;
    }

    if (this.props.schema.enum) {
      return <SelectWidget {...this.props}/>;
    }

    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

    const multilineProps = {};
    if (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'textarea') {
      multilineProps.multiLine = true;
      multilineProps.rows = this.props.uiSchema['ui:rows'] || 4;
    } else {
      if (this.props.schema.title) {
        multilineProps.style = { height: '50px', width: '100%' };
        multilineProps.floatingLabelStyle = { top: '18px' };
        multilineProps.inputStyle = { height: '30px', top: '-2px' };
      } else {
        multilineProps.style = { width: '100%' };
      }
    }
    return (
      <TextField
        name={this.props.name}
        floatingLabelText={this.props.schema.title}
        value={this.props.formData}
        onChange={this.handleOnChange.bind(this)}
        {...errors}
        {...multilineProps}
      />);
  }
}
