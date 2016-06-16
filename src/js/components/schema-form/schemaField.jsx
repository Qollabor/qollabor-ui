import React from 'react';

import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { BooleanWidget } from './widgets/boolean';
import { StringWidget } from './widgets/string';
import { IntegerWidget } from './widgets/integer';
import { ArrayField } from './widgets/array';

export const CustomSchemaField = function (props) {
  let readonly = {};
  if (props.uiSchema && props.uiSchema['ui:readonly'] === true) {
    readonly = { readonly: true };
  }
  switch (props.schema.type) {
    case 'string':
      return <StringWidget {...props} {...readonly}/>;
    case 'integer':
      return <IntegerWidget {...props} {...readonly}/>;
    case 'boolean':
      return <BooleanWidget {...props} {...readonly}/>;
    case 'array':
      return <ArrayField {...props} {...readonly}/>;
    default:
      return <SchemaField {...props} {...readonly}/>;
  }
};
