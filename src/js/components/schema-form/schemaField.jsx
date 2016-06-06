import React from 'react';

import SchemaField from 'react-jsonschema-form/lib/components/fields/SchemaField';
import { BooleanWidget } from './widgets/boolean';
import { StringWidget } from './widgets/string';
import { IntegerWidget } from './widgets/integer';
import { ArrayField } from './widgets/array';

export const CustomSchemaField = function (props) {
  switch (props.schema.type) {
    case 'string':
      return <StringWidget {...props}/>;
    case 'integer':
      return <IntegerWidget {...props}/>;
    case 'boolean':
      return <BooleanWidget {...props}/>;
    case 'array':
      return <ArrayField {...props}/>;
    default:
      return <SchemaField {...props} />;
  }
};
