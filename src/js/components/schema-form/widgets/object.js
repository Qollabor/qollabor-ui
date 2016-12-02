import React, { Component, PropTypes } from 'react';
import deeper from 'deeper';

import { StepperWidget } from './stepper';

import {
  getDefaultFormState,
  orderProperties,
  retrieveSchema,
  shouldRender,
  getDefaultRegistry,
  setState
} from 'react-jsonschema-form/lib/utils';

import { HelpWidget } from './help';

function objectKeysHaveChanged(formData, state) {
  // for performance, first check for lengths
  const newKeys = Object.keys(formData);
  const oldKeys = Object.keys(state);
  if (newKeys.length < oldKeys.length) {
    return true;
  }
  // deep check on sorted keys
  if (!deeper(newKeys.sort(), oldKeys.sort())) {
    return true;
  }
  return false;
}

export class ObjectField extends Component {

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    const state = this.getStateFromProps(nextProps);
    const { formData } = nextProps;
    if (formData && objectKeysHaveChanged(formData, this.state)) {
      // We *need* to replace state entirely here has we have received formData
      // holding different keys (so with some removed).
      this.state = state;
      this.forceUpdate();
    } else {
      this.setState(state);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState) ||
     (nextProps.error.length !== this.props.error.length);
  }

  onPropertyChange(name) {
    return (value, options) => {
      this.asyncSetState({ [name]: value }, options);
    };
  }

  getStateFromProps(props) {
    const { schema, formData, registry } = props;
    const error = props.error || {};
    return getDefaultFormState(schema, formData, registry.definitions, error) || {};
  }

  asyncSetState(state, options = { validate: false }) {
    setState(this, state, () => {
      this.props.onChange(this.state, options);
    });
  }

  isRequired(name) {
    const schema = this.props.schema;
    return Array.isArray(schema.required) &&
      schema.required.indexOf(name) !== -1;
  }

  render() {
    const {
      uiSchema,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly
    } = this.props;


    const { definitions, fields } = this.props.registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions);
    const title = (schema.title || name) + (required ? ' *' : '');
    const error = this.props.error || {};

    let orderedProperties;
    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema['ui:order']);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: 'red' }}>
            Invalid {name || 'root'} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>{JSON.stringify(schema)}</pre>
        </div>
      );
    }

    let help = null;
    if (uiSchema && uiSchema['ui:help']) {
      help = uiSchema['ui:help'];
    }
    let helpWidget = null;
    if (help) {
      helpWidget =
        <div style={{ zIndex: 100, marginTop: '2px' }}><HelpWidget help={help} /></div>;
    }

    if (uiSchema && uiSchema['ui:widget'] === 'stepper') {
      return <StepperWidget {...this.props} />;
    }

    const showTitle = (this.props.hideTitle !== true);
    const titleElement = showTitle && title ?
      <TitleField
        id={`${idSchema.id}__title`}
        title={title}
        required={required}
      /> : null;

    const descriptionElement = schema.description ?
      <DescriptionField
        id={`${idSchema.id}__description`}
        description={schema.description}
      /> : null;

    return (
      <fieldset>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexGrow: 5 }}>
            {titleElement}
          </div>
          {helpWidget}
        </div>

        {descriptionElement}
        {
          orderedProperties.map((propertyName, index) => (
            <SchemaField
              key={index}
              name={propertyName}
              required={this.isRequired(propertyName)}
              schema={schema.properties[propertyName]}
              uiSchema={uiSchema[propertyName]}
              errorSchema={errorSchema[propertyName]}
              error={error[propertyName]}
              idSchema={idSchema[propertyName]}
              formData={this.state[propertyName]}
              onChange={this.onPropertyChange(propertyName)}
              registry={this.props.registry}
              disabled={disabled}
              readonly={readonly}
            />)
          )
        }</fieldset>
    );
  }
}

ObjectField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  ObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
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

export default ObjectField;
