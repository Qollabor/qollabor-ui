import React from 'react';

import JsonSchemaForm from 'react-jsonschema-form';
import { RaisedButton } from 'material-ui';

import { CustomSchemaField } from './schemaField';
import { CustomTitleField } from './titleField';

const fields = {
  SchemaField: CustomSchemaField,
  TitleField: CustomTitleField
};

export class Form extends React.Component {
  handleOnChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  handleOnSubmit(value) {
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
    const buttonList = this.props.buttonList ? this.props.buttonList : [
      <RaisedButton key="submit" label="Submit" primary={true} type="submit"/>,
      <RaisedButton key="reset" label="Reset" primary={false} secondary={true}/>];

    let uiSchema = Object.assign({}, this.props.uiSchema);
    if (this.props.readonly) {
      uiSchema = Object.assign(uiSchema, { 'ui:readonly': true });
    }

    if (this.props.disabled) {
      uiSchema = Object.assign(uiSchema, { 'ui:disabled': true });
    }

    const buttonWrapper = <div className="form-buttons">{buttonList}</div>;
    return (
      <div className="cafienne-form">
        <JsonSchemaForm
          schema={this.props.schema}
          uiSchema={uiSchema}
          formData={this.props.formData}
          fields={fields}
          onChange={this.handleOnChange.bind(this)}
          onSubmit={this.handleOnSubmit.bind(this)}
          onError={this.handleOnError.bind(this)}
        >{buttonWrapper}</JsonSchemaForm>
      </div>
    );
  }
}
