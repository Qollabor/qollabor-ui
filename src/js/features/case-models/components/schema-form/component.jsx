import React from 'react';
import { Form } from '../../../../components/schema-form/form';

export class CaseModelSchemaForm extends React.Component {
  render() {
    return (
      <Form
        buttonList={this.props.buttonList}
        schema={this.props.schema}
        formData={this.props.formData}
        uiSchema={this.props.uiSchema}
        onSubmit={this.props.onSubmit}
      />
    );
  }
}

CaseModelSchemaForm.propTypes = {
  buttonList: React.PropTypes.array,
  formData: React.PropTypes.object,
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  uiSchema: React.PropTypes.object
};

export default CaseModelSchemaForm;
