import React from 'react';
import { Paper } from 'material-ui';
import { Form } from '../../../../components/schema-form/form';

export class CaseModelSchemaForm extends React.Component {
  render() {
    return (
      <Paper style={{ padding: '5px', marginTop: '15px' }}>
        <Form
          buttonList={this.props.buttonList}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          onSubmit={this.props.onSubmit}
        />
      </Paper>
    );
  }
}

CaseModelSchemaForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default CaseModelSchemaForm;
