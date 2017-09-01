import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { HelpWidget } from './help';
import styles from '../styles';

export class NumberWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event) {
    event.persist();
    this.props.onChange(Number(event.target.value));
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
      helpWidget =
        (
          <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}>
            <HelpWidget help={help} />
          </div>
        );
    }

    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    return (
      <div>
        {helpWidget}
        <TextField
          name={this.props.name}
          type="number"
          step="any"
          floatingLabelText={title}
          floatingLabelFixed={true}
          value={this.props.formData}
          style={styles.field}
          errorStyle={styles.errorLabel}
          floatingLabelFocusStyle={styles.floatingLabel}
          onChange={this.handleOnChange}
          disabled={this.props.disabled || this.props.readonly}
          inputStyle={this.props.readonly && { cursor: 'text' }}
          underlineStyle={this.props.readonly && { cursor: 'text' }}
          {...errors}
        />
      </div>
    );
  }
}

NumberWidget.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
