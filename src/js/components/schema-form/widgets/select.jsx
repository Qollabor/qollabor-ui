import React from 'react';
import { SelectField, MenuItem } from 'material-ui';
import { HelpWidget } from './help';
import styles from '../styles';

export class SelectWidget extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

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

    errors.errorText = this.props.error && this.props.error.message;

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    let helpWidget = false;
    if (help) {
      helpWidget = (
        <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}>
          <HelpWidget help={help} />
        </div>
      );
    }

    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    const options = this.props.options;
    return (
      <div>
        {helpWidget}
        <SelectField
          name={this.props.name}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          errorStyle={styles.errorLabel}
          value={this.props.formData}
          disabled={this.props.disabled || this.props.readonly}
          style={styles.field}
          iconStyle={this.props.readonly && { cursor: 'text' }}
          labelStyle={this.props.readonly && { cursor: 'text' }}
          underlineDisabledStyle={this.props.readonly && { cursor: 'text' }}
          underlineStyle={this.props.readonly && { cursor: 'text' }}
          onChange={this.handleOnChange.bind(this)}
          {...errors}
        >
          {options.map(item => <MenuItem key={item.value} value={item.value} primaryText={item.label} />)}
        </SelectField>
      </div>
    );
  }
}

SelectWidget.propTypes = {
  disabled: React.PropTypes.bool,
  error: React.PropTypes.object,
  errorSchema: React.PropTypes.object,
  formData: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  readonly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};
