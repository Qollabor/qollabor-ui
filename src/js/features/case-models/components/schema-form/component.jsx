import React from 'react';
import { Form } from '../../../../components/schema-form/form';

export class CaseModelSchemaForm extends React.Component {
  render() {
    return (
      <Form
        buttonList={this.props.buttonList}
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        onSubmit={this.props.onSubmit}
      />
    );
  }
}

CaseModelSchemaForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default CaseModelSchemaForm;
