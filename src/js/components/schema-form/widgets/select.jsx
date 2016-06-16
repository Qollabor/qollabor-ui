import React from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { ReadOnlyWidget } from './readonly';

export class SelectWidget extends React.Component {
  handleOnChange(event, index, newValue) {
    this.props.onChange(newValue);
  }

  render() {
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.props.formData}
        />
      );
    }

    return (
      <div>
        <SelectField
          name={this.props.name}
          floatingLabelText={this.props.schema.title}
          value={this.props.formData}
          onChange={this.handleOnChange.bind(this)}
          {...errors}
        >
          {this.props.schema.enum.map(item => <MenuItem key={item} value={item} primaryText={item}/>)}
        </SelectField>
      </div>
    );
  }
}
