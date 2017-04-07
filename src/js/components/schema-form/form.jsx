import React from 'react';

import JsonSchemaForm from 'react-jsonschema-form';

import { CustomSchemaField } from './schemaField';
import { CustomTitleField } from './titleField';
import { validate } from './validator';

const fields = {
  SchemaField: CustomSchemaField,
  TitleField: CustomTitleField
};

export class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { error: {} };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleOnSubmit(value) {
    const errors = validate(value.schema,
                        value.schema.definitions,
                        value.formData);

    this.setState({ error: errors.normalizedErrors });
    if (errors.normalizedErrors.length > 0) {
      // eslint-disable-next-line no-param-reassign
      value.errors = errors;
      this.handleOnError(value);
      return;
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(value);
    }
  }

  handleOnError(value) {
    if (this.props.onError) {
      this.props.onError(value);
    }
  }

  render() {
    let uiSchema = Object.assign({}, this.props.uiSchema);
    if (this.props.readonly) {
      uiSchema = Object.assign(uiSchema, { 'ui:readonly': true });
    }

    if (this.props.disabled) {
      uiSchema = Object.assign(uiSchema, { 'ui:disabled': true });
    }

    // Some hack to get errors passed through the SchemaForm
    uiSchema.error = this.state.error || {};

    const buttonWrapper = <div className="form-buttons">{this.props.buttonList}</div>;
    return (
      <div className="cafienne-form">
        <JsonSchemaForm
          schema={this.props.schema}
          uiSchema={uiSchema}
          formData={this.props.formData}
          fields={fields}
          onChange={this.handleOnChange}
          onSubmit={this.handleOnSubmit}
          onError={this.handleOnError}
          noValidate={true}
        >{buttonWrapper}</JsonSchemaForm>
      </div>
    );
  }
}

Form.propTypes = {
  buttonList: React.PropTypes.node,
  disabled: React.PropTypes.bool,
  formData: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onError: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};
