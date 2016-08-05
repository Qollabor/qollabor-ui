import React from 'react';

import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { BooleanWidget } from './widgets/boolean';
import { StringWidget } from './widgets/string';
import { IntegerWidget } from './widgets/integer';
import { NumberWidget } from './widgets/number';
import { ArrayField } from './widgets/array';
import { ObjectField } from './widgets/object';

export const CustomSchemaField = function (props) {
  let readonly = {};
  if (props.uiSchema && props.uiSchema['ui:readonly'] === true) {
    readonly = { readonly: true };
  }

  let disabled = {};
  if (props.uiSchema && props.uiSchema['ui:disabled'] === true) {
    disabled = { disabled: true };
  }

  switch (props.schema.type) {
    case 'string':
      return <StringWidget {...props} {...readonly} {...disabled}/>;
    case 'integer':
      return <IntegerWidget {...props} {...readonly} {...disabled}/>;
    case 'number':
      return <NumberWidget {...props} {...readonly} {...disabled}/>;
    case 'boolean':
      return <BooleanWidget {...props} {...readonly} {...disabled}/>;
    case 'array':
      return <ArrayField {...props} {...readonly} {...disabled}/>;
    case 'object':
      return <ObjectField {...props} {...readonly} {...disabled}/>;
    default:
      return <SchemaField {...props} {...readonly} {...disabled}/>;
  }
};
