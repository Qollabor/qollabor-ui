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
    number: { type: 'number', title: 'Some number' },
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
        bar: { type: 'string', title: 'Bar value' },
        baz: { type: 'string', title: 'BAz value' }
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
  title: {
    'ui:help': 'This is a title'
  },
  multilineTitle: {
    'ui:widget': 'textarea',
    'ui:rows': 5,
    'ui:help': 'This is a multiline text'
  },

  done: { 'ui:help': 'This is a checkbox' },

  integer: {
    'ui:help': 'This is an integer'
  },
  number: {
    'ui:help': 'This is a number'
  },
  destination: {
    'ui:addLabel': 'Add new destination',
    'ui:help': 'This is an string array'
  },
  birth: {
    'ui:help': 'This is an date'
  },
  time: {
    'ui:help': 'This is an time'
  },
  foo: {
    'ui:help': 'This is an object',
    bar: {
      'ui:help': 'This is an bar help'
    }
  },
  list: { 'ui:help': 'This is a list' }
};

const uiSchemaReadonly = {
  title: {
    'ui:readonly': true,
    'ui:help': 'This is a title'
  },
  multilineTitle: {
    'ui:readonly': true,
    'ui:widget': 'textarea',
    'ui:rows': 5,
    'ui:help': 'This is a multiline text'
  },

  done: { 'ui:readonly': true, 'ui:help': 'This is a checkbox' },

  integer: {
    'ui:readonly': true, 'ui:help': 'This is an integer'
  },
  number: {
    'ui:readonly': true, 'ui:help': 'This is a number'
  },
  destination: {
    'ui:addLabel': 'Add new destination',
    'ui:readonly': true, 'ui:help': 'This is an string array'
  },
  birth: {
    'ui:readonly': true,
    'ui:help': 'This is an date'
  },
  time: {
    'ui:readonly': true,
    'ui:help': 'This is an time'
  },
  foo: {
    'ui:readonly': true,
    'ui:help': 'This is an object'
  },
  list: { 'ui:readonly': true, 'ui:help': 'This is a list' }
};

const formData = {
  title: 'First task',
  multilineTitle: 'Multiline content \n with more line',
  done: true,
  integer: 200,
  number: 1.22,
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
  .add('Sample Disabled', () => (
    <div className="center-component">
      <Paper style={paperStyle}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onSubmit={action('onSubmit')}
          onError={action('onError')}
          disabled={true}
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
