import React from 'react';
import { Paper } from 'material-ui';
import { Form } from '../../../../components/schema-form/form';

export class TaskModelSchemaForm extends React.Component {
  render() {
    return (
      <Paper style={{ padding: 5, marginTop: 15, minHeight: 300 }}>
        <Form
          buttonList={this.props.buttonList}
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          formData={this.props.formData}
          onSubmit={this.props.onSubmit}
        />
      </Paper>
    );
  }
}

TaskModelSchemaForm.propTypes = {
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default TaskModelSchemaForm;
