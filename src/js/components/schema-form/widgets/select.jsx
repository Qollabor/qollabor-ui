import React from 'react';
import PropTypes from 'prop-types';
import { SelectField, MenuItem } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import styles from '../styles';

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

    errors.errorText = this.props.error && this.props.error.message;

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
          style={styles.field}
          floatingLabelFocusStyle={styles.floatingLabel}
          errorStyle={styles.errorLabel}
          value={this.props.formData}
          disabled={this.props.disabled}
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
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
