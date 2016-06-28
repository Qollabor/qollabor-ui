import React, { PropTypes } from 'react';

import { IconButton, FontIcon } from 'material-ui';
import { FieldTitle } from './fieldTitle';
import { FieldItem } from './fieldItem';

import styles from './styles';

import {
  getDefaultFormState,
  isFixedItems,
  allowAdditionalItems,
  retrieveSchema,
  toIdSchema,
  shouldRender,
  getDefaultRegistry,
  setState
} from 'react-jsonschema-form/lib/utils';

export class FixedArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  getStateFromProps(props) {
    const formData = Array.isArray(props.formData) ? props.formData : null;
    const { definitions } = this.props.registry;
    return {
      items: getDefaultFormState(props.schema, formData, definitions) || []
    };
  }

  isItemRequired(itemsSchema) {
    return itemsSchema.type === 'string' && itemsSchema.minLength > 0;
  }

  asyncSetState(state, options = { validate: false }) {
    setState(this, state, () => {
      this.props.onChange(this.state.items, options);
    });
  }

  handleAddClick(event) {
    try {
      event.preventDefault();
    } catch (e) {
      event.returnValue = false;
    }
    const { items } = this.state;
    const { schema, registry } = this.props;
    const { definitions } = registry;
    let itemSchema = schema.items;
    if (isFixedItems(schema) && allowAdditionalItems(schema)) {
      itemSchema = schema.additionalItems;
    }
    this.asyncSetState({
      items: items.concat([
        getDefaultFormState(itemSchema, undefined, definitions)
      ])
    });
  }

  handleDropIndexClick(index) {
    return (event) => {
      try {
        event.preventDefault();
      } catch (e) {
        event.returnValue = false;
      }
      this.asyncSetState({
        items: this.state.items.filter((_, i) => i !== index)
      }, { validate: true }); // refs #195
    };
  }

  handleChangeForIndex(index) {
    return (value) => {
      this.asyncSetState({
        items: this.state.items.map((item, i) => (index === i ? value : item))
      });
    };
  }

  render() {
    const {
      schema,
      uiSchema,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly
    } = this.props;
    const title = schema.title || name;
    let { items } = this.state;
    const { definitions, fields } = this.props.registry;
    const { TitleField } = fields;
    const itemSchemas = schema.items.map(item =>
      retrieveSchema(item, definitions));
    const additionalSchema = allowAdditionalItems(schema) ?
      retrieveSchema(schema.additionalItems, definitions) : null;

    if (!items || items.length < itemSchemas.length) {
      // to make sure at least all fixed items are generated
      items = items || [];
      items = items.concat(new Array(itemSchemas.length - items.length));
    }

    const addButton = additionalSchema ? (
      <div style={styles.addButtonContainer}>
        <IconButton
          tooltip={(uiSchema && uiSchema['ui:addLabel'] ? uiSchema['ui:addLabel'] : 'Add')}
          disabled={disabled || readonly}
          onClick={this.handleAddClick.bind(this)}
          style={{ width: '25px', height: '25px', padding: '0px' }}
        >
          <FontIcon className="material-icons">add</FontIcon>
        </IconButton>
      </div>) : null;
    return (
      <fieldset>
        {addButton}
        <FieldTitle
          TitleField={TitleField}
          idSchema={idSchema}
          title={title}
          required={required}
        />
        {schema.description ?
          <div className="field-description">{schema.description}</div> : null}
        <div className="row array-item-list">{
          items.map((item, index) => {
            const additional = index >= itemSchemas.length;
            const itemSchema = additional ?
              additionalSchema : itemSchemas[index];
            const itemIdPrefix = `${idSchema.id}_${index}`;
            const itemIdSchema = toIdSchema(itemSchema, itemIdPrefix, definitions);
            /* eslint-disable no-nested-ternary */
            const itemUiSchema = additional ? uiSchema.additionalItems || {} :
              Array.isArray(uiSchema.items) ?
                uiSchema.items[index] : uiSchema.items || {};
            /* eslint-enable no-nested-ternary */
            const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;

            return (
              <FieldItem
                key={index}

                index={index}
                itemSchema={itemSchema}
                itemIdSchema={itemIdSchema}
                itemErrorSchema={itemErrorSchema}
                itemData={item}
                itemUiSchema={itemUiSchema}
                removable={additional}
                disabled={this.props.disabled}
                readOnly={this.props.readOnly}
                required={this.isItemRequired(itemSchema)}
                registry={this.props.registry}
                onDropIndexClick={this.handleDropIndexClick(index)}
                onChangeForIndex={this.handleChangeForIndex(index)}
              />);
          })
        }</div>
      </fieldset>
    );
  }
}

FixedArray.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  FixedArray.propTypes = {
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

export default FixedArray;
