import React, { PropTypes } from 'react';

import { IconButton, FontIcon } from 'material-ui';

import styles from './styles';

import {
  shouldRender,
  getDefaultRegistry
} from 'react-jsonschema-form/lib/utils';

export class FieldItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  render() {
    const {
      index,
      itemSchema,
      itemUiSchema,
      itemData,
      itemIdSchema,
      itemErrorSchema,
      disabled,
      removable,
      required,
      readonly,
      registry,
      onDropIndexClick,
      onChangeForIndex
    } = this.props;

    const removeButton = removable ? (
      <div style={styles.removeButtonContainer}>
        <IconButton
          tabIndex={-1}
          disabled={disabled || readonly}
          onClick={onDropIndexClick}
          style={{ width: '25px', height: '25px', padding: '0px' }}
        >
          <FontIcon color="#EFD2D2" hoverColor="#E24949" className="material-icons">clear</FontIcon>
        </IconButton>
      </div>) : null;

    const { SchemaField } = registry.fields;

    const content = (<SchemaField
      schema={itemSchema}
      uiSchema={itemUiSchema}
      formData={itemData}
      errorSchema={itemErrorSchema}
      idSchema={itemIdSchema}
      onChange={onChangeForIndex}
      registry={registry}
      required={required}
      disabled={disabled}
      readonly={readonly}
    />);

    return (
      <div key={index} style={styles.fieldItemContainer}>
        <div
          style={Object.assign({}, styles.arrayItemContainer, removable ? styles.arrayItemContainerRemovable : {})}
        >
          {content}
        </div>
        {removeButton}
      </div>
    );
  }
}

FieldItem.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false,
  removable: true
};

if (process.env.NODE_ENV !== 'production') {
  FieldItem.propTypes = {
    index: PropTypes.number.isRequired,
    itemSchema: PropTypes.object.isRequired,
    itemUiSchema: PropTypes.object,
    itemData: PropTypes.object,
    itemIdSchema: PropTypes.object,
    itemErrorSchema: PropTypes.object,

    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    removable: PropTypes.bool,

    onDropIndexClick: PropTypes.func.isRequired,
    onChangeForIndex: PropTypes.func.isRequired,

    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.func).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired
    })
  };
}

export default FieldItem;
