import React from 'react';

import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';

import { BooleanWidget } from './widgets/boolean';
import { StringWidget } from './widgets/string';
import { IntegerWidget } from './widgets/integer';
import { NumberWidget } from './widgets/number';
import { ArrayField } from './widgets/array';
import { ObjectField } from './widgets/object';

import { retrieveSchema } from 'react-jsonschema-form/lib/utils';


export const CustomSchemaField = function (props) {
  let readonly = {};
  if (props.uiSchema && props.uiSchema['ui:readonly'] === true) {
    readonly = { readonly: true };
  }

  let disabled = {};
  if (props.uiSchema && props.uiSchema['ui:disabled'] === true) {
    disabled = { disabled: true };
  }

  const schema = retrieveSchema(props.schema, props.registry.definitions);

  // Some hack to get errors passed through the SchemaForm
  const error = props.error || (props.uiSchema && props.uiSchema.error) || {};

  const schemaProps = { schema, error };

  // Provide our custom fields, return the original schema field if we do not
  // have a custome one. Also string type extensions are in the String Widget
  switch (schema.type) {
    case 'string':
      return <StringWidget {...props} {...readonly} {...disabled} {...schemaProps} />;
    case 'integer':
      return <IntegerWidget {...props} {...readonly} {...disabled} {...schemaProps} />;
    case 'number':
      return <NumberWidget {...props} {...readonly} {...disabled} {...schemaProps} />;
    case 'boolean':
      return <BooleanWidget {...props} {...readonly} {...disabled} {...schemaProps} />;
    case 'array':
      return <ArrayField {...props} {...readonly} {...disabled} {...schemaProps} />;
    case 'object':
      return <ObjectField {...props} {...readonly} {...disabled} {...schemaProps} />;
    default:
      return <SchemaField {...props} {...readonly} {...disabled} {...schemaProps} />;
  }
};


CustomSchemaField.propTypes = {
  error: React.PropTypes.object,
  registry: React.PropTypes.object,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};
