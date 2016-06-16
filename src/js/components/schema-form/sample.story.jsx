import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Paper } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const schemaNCIA = require('./data/ncia.json');

const paperStyle = { padding: '5px', width: '700px' };

import { Form } from './form';

const schema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task', minLength: 3 },
    multilineTitle: { type: 'string', title: 'Multiline', default: 'A new multiline title' },
    done: { type: 'boolean', title: 'Done?', default: false },
    integer: { type: 'integer', title: 'age' },
    destination: {
      type: 'array',
      minItems: 1,
      items: { type: 'string' },
      readonly: true
    },
    birth: { type: 'string', format: 'date', title: 'Birth date' },
    time: { type: 'string', format: 'time', title: 'Birth time' },
    foo: {
      type: 'object',
      properties: {
        bar: { type: 'string' },
        baz: { type: 'string' }
      }
    },
    list: {
      title: 'Model of transport',
      type: 'string',
      enum: ['Air', 'Hire car', 'Public transport', 'Shuttle', 'POMV', 'Other']
    }
  }
};

const uiSchema = {
  multilineTitle: {
    'ui:readonly': true,
    'ui:widget': 'textarea',
    'ui:rows': 5
  },
  destination: {
    'ui:addLabel': 'Add new destination'
  }
};

const uiSchemaReadonly = {
  title: {
    'ui:readonly': true
  },
  multilineTitle: {
    'ui:readonly': true,
    'ui:widget': 'textarea',
    'ui:rows': 5
  },

  done: { 'ui:readonly': true },

  integer: {
    'ui:readonly': true
  },
  destination: {
    'ui:addLabel': 'Add new destination',
    'ui:readonly': true
  },
  birth: {
    'ui:readonly': true
  },
  time: {
    'ui:readonly': true
  },
  foo: {
    'ui:readonly': true,
    bar: {
      'ui:readonly': true
    },
    baz: {
      'ui:readonly': true
    }
  },
  list: { 'ui:readonly': true }
};

const formData = {
  title: 'First task',
  multilineTitle: 'Multiline content \n with more line',
  done: true,
  birth: '2016-10-10',
  time: '12:16:00',
  foo: {
    bar: 'barbarbar',
    baz: 'bazbazbaz'
  },
  destination: [
    'Europe', 'USA'
  ]
};

storiesOf('SchemaForm', module)
  .addDecorator((getStory) => <MuiThemeProvider muiTheme={getMuiTheme()}>{getStory()}</MuiThemeProvider>)
  .add('Sample 1', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Paper>
    </div>
  ))
  .add('Sample ReadOnly', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <Form
          schema={schema}
          uiSchema={uiSchemaReadonly}
          formData={formData}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Paper>
    </div>
  ))
  .add('Sample NCIA', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <Form
          schema={schemaNCIA}
          formData={formData}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
        />
      </Paper>
    </div>
  ));
