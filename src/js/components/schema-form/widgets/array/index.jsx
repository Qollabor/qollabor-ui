import React, { PropTypes } from 'react';

import { NormalArray } from './normalArray';
import { FilesArray } from './filesArray';
import { MultiSelectArray } from './multiSelectArray';
import { FixedArray } from './fixedArray';

import {
  isMultiSelect,
  isFilesArray,
  isFixedItems,
  shouldRender,
  getDefaultRegistry
} from 'react-jsonschema-form/lib/utils';

export class ArrayField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  render() {
    const { schema, uiSchema } = this.props;

    if (isFilesArray(schema, uiSchema)) {
      return <FilesArray {...this.props} />;
    }
    if (isFixedItems(schema)) {
      return <FixedArray {...this.props} />;
    }
    if (isMultiSelect(schema)) {
      return <MultiSelectArray {...this.props} />;
    }
    return <NormalArray {...this.props} />;
  }
}

ArrayField.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  ArrayField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.array,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.func).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired
    })
  };
}

export default ArrayField;
