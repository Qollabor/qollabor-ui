import React from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';

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

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.props.formData}
          help={help}
        />
      );
    }

    let helpWidget = false;
    if (help) {
      helpWidget = (
        <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}>
          <HelpWidget help={help}/>
        </div>
      );
    }

    return (
      <div>
        {helpWidget}
        <SelectField
          name={this.props.name}
          floatingLabelText={this.props.schema.title}
          value={this.props.formData}
          disabled={this.props.disabled}
          onChange={this.handleOnChange.bind(this)}
          {...errors}
        >
          {this.props.schema.enum.map(item => <MenuItem key={item} value={item} primaryText={item}/>)}
        </SelectField>
      </div>
    );
  }
}
