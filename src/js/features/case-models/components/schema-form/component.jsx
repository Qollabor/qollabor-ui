import React from 'react';
import PropTypes from 'prop-types';
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
  buttonList: PropTypes.array,
  formData: PropTypes.object,
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  uiSchema: PropTypes.object
};

export default CaseModelSchemaForm;
