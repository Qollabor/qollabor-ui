import React, { Component, PropTypes } from 'react';

import { IconButton, FontIcon, Paper } from 'material-ui';
import { FieldTitle } from './fieldTitle';
import { FieldDescription } from './fieldDescription';
import { FieldItem } from './fieldItem';
import { HelpWidget } from '../help';

import styles from './styles';

import {
  getDefaultFormState,
  retrieveSchema,
  toIdSchema,
  shouldRender,
  getDefaultRegistry,
  setState
} from 'react-jsonschema-form/lib/utils';

export class NormalArray extends Component {
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
    this.asyncSetState({
      items: items.concat([
        getDefaultFormState(schema.items, undefined, definitions)
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
      disabled,
      readonly
    } = this.props;

    const title = (schema.title || name) + (this.props.required ? ' *' : '');
    const { items } = this.state;
    const { definitions, fields } = this.props.registry;
    const { DescriptionField } = fields;
    const itemsSchema = retrieveSchema(schema.items, definitions);

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    let helpWidget = false;
    if (help) {
      helpWidget =
        <div style={{ zIndex: 100, marginTop: '2px' }}><HelpWidget help={help}/></div>;
    }

    let addButton = false;
    if (!this.props.readonly) {
      addButton = (
        <div style={styles.addButtonContainer}>
          <IconButton
            tooltip={(uiSchema && uiSchema['ui:addLabel'] ? uiSchema['ui:addLabel'] : 'Add')}
            disabled={disabled || readonly}
            onClick={this.handleAddClick.bind(this)}
            style={{ width: '25px', height: '25px', padding: '0px' }}
          >
            <FontIcon color="#aaa" hoverColor="#333" className="material-icons">add</FontIcon>
          </IconButton>
        </div>
      );
    }
    return (
      <Paper
        zDepth={2}
        style={styles.fixedArrayContainer}
      >
        <div style={styles.header}>
          <div style={{ flexGrow: 5 }}>
            <FieldTitle
              idSchema={idSchema}
              title={title}
            />
          </div>
          {addButton}
          {helpWidget}
        </div>
        {schema.description ?
          <FieldDescription
            DescriptionField={DescriptionField}
            idSchema={idSchema}
            description={schema.description}
          /> : null}
        <div className="row array-item-list">{
          items.map((item, index) => {
            const itemErrorSchema = errorSchema ? errorSchema[index] : undefined;
            const itemIdPrefix = `${idSchema.id}_${index}`;
            const itemIdSchema = toIdSchema(itemsSchema, itemIdPrefix, definitions);
            return (
              <FieldItem
                key={index}
                index={index}
                itemSchema={itemsSchema}
                itemIdSchema={itemIdSchema}
                itemErrorSchema={itemErrorSchema}
                itemData={items[index]}
                itemUiSchema={uiSchema.items}
                disabled={this.props.disabled}
                readonly={this.props.readonly}
                required={this.isItemRequired(itemsSchema)}
                registry={this.props.registry}
                onDropIndexClick={this.handleDropIndexClick(index)}
                onChangeForIndex={this.handleChangeForIndex(index)}
              />);
          })
        }</div>
      </Paper>
    );
  }
}

NormalArray.defaultProps = {
  uiSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  NormalArray.propTypes = {
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

export default NormalArray;
