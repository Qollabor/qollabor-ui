import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import { Form } from '../form';

const paperStyle = { padding: '5px', width: '300px' };

const schema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task', minLength: 3 },
    done: { type: 'boolean', title: 'Done?', default: false },
    birth: { type: 'string', format: 'date' },
    time: { type: 'string', format: 'time' }
  }
};

export class SampleFormComponent extends React.Component {
  render() {
    return (
      <div className="center-component">
        <Paper style={paperStyle}>
          <Form
            schema={schema}
            formData={this.props.formData}
            onSubmit={this.props.onSubmit}
            onError={this.props.onError}
            onChange={this.props.onChange}
          />
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.schemaForm.get('formData')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (schemaForm) => {
      dispatch({ type: 'SCHEMA_FORM:FORM:SUBMIT', formData: schemaForm.formData });
    },
    onError: (error) => {
      dispatch({ type: 'SCHEMA_FORM:FORM:ERROR', error });
    },
    onChange: (schemaForm) => {
      dispatch({ type: 'SCHEMA_FORM:FORM:CHANGE', formData: schemaForm.formData });
    }
  };
}


export const SampleForm = connect(mapStateToProps, mapDispatchToProps)(SampleFormComponent);
