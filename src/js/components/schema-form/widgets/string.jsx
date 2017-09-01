import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { optionsList } from 'react-jsonschema-form/lib/utils';
import { DateWidget } from './date';
import { DateTimeWidget } from './datetime';
import { HelpWidget } from './help';
import { TimeWidget } from './time';
import { SelectWidget } from './select';
import { UserSelectorWidget } from './userselector';
import { RadioWidget } from './radio';
import styles from '../styles';

export class StringWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    event.persist();
    this.props.onChange(event.target.value);
  }

  render() {
    if (this.props.schema.format === 'date') {
      return <DateWidget {...this.props} />;
    }

    if (this.props.schema.format === 'user-selector' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'user-selector')) {
      return <UserSelectorWidget {...this.props} />;
    }

    if (this.props.schema.format === 'radio' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'radio')) {
      if (this.props.uiSchema.options) {
        const options = this.props.uiSchema.options;
        return (<RadioWidget
          options={options}
          defaultSelected={this.props.uiSchema.defaultSelected}
          {...this.props}
        />);
      }
    }

    if (this.props.schema.format === 'date-time' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'date-time')
    ) {
      return <DateTimeWidget {...this.props} />;
    }

    if (
      this.props.schema.format === 'time' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'time')
    ) {
      return <TimeWidget {...this.props} />;
    }

    if (this.props.schema.enum) {
      const enumOptions = optionsList(this.props.schema);
      return <SelectWidget options={enumOptions} {...this.props} />;
    }

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

    const style = Object.assign({}, styles.field, { width: '100%' });

    const textProps = Object.assign({}, {
      style,
      errorStyle: styles.errorLabel
    });

    if (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'textarea') {
      textProps.multiLine = true;
      textProps.rows = 2;
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
          floatingLabelText={title}
          value={this.props.formData}
          onChange={this.handleOnChange}
          disabled={this.props.disabled || this.props.readonly}
          inputStyle={this.props.readonly && { cursor: 'text' }}
          underlineStyle={this.props.readonly && { cursor: 'text' }}
          {...errors}
          {...textProps}
        />
      </div>
    );
  }
}

StringWidget.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
