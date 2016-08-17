import React, { Component, PropTypes } from 'react';

import {
  getDefaultFormState,
  getDefaultRegistry,
  orderProperties,
  retrieveSchema,
  setState
} from 'react-jsonschema-form/lib/utils';

import { validate } from '../validator';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';

import { FlatButton, RaisedButton } from 'material-ui';

export class StepperWidget extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({
      finished: false,
      stepIndex: 0,
      errors: {}
    }, this.getStateFromProps(props));
  }

  onPropertyChange(name) {
    return (value, options) => {
      const mergedFormData = Object.assign(this.state.formData,
        { [name]: value });
      this.asyncSetState(mergedFormData, options);
    };
  }

  getStateFromProps(props) {
    const { schema, formData, registry } = props;
    const totalSteps = this.getTotalStepCount(schema);
    return Object.assign({
      schema,
      totalSteps
    }, { formData: getDefaultFormState(schema, formData, registry.definitions) });
  }

  getTotalStepCount(schema) {
    return Object.keys(schema.properties).reduce((prev) => (prev + 1), 0);
  }

  updateCurrentStep(stepIndex, currentStepName) {
    if (! this.validateAndSetErrors(currentStepName)) return;

    this.setState({
      stepIndex,
      finished: stepIndex >= this.state.totalSteps - 1
    });
  }

  asyncSetState(state, options = { validate: false }) {
    const self = this;
    setState(this, state, () => {
      this.props.onChange(self.state.formData, options);
    });
  }

  handleNext(currentStepName) {
    if (! this.validateAndSetErrors(currentStepName)) return;

    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= this.state.totalSteps - 1
    });
  }

  validateAndSetErrors(currentStepName) {
    const { normalizedErrors } = validate(this.props.schema.properties[currentStepName],
                        this.props.registry.definitions,
                        this.state.formData[currentStepName]);

    if (normalizedErrors.length > 0) {
      this.setState({ errors:
        { [currentStepName]: normalizedErrors }
      });
      return false;
    }

    return true;
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        finished: stepIndex >= this.state.totalSteps - 1
      });
    }
  }

  isRequired(name) {
    const schema = this.props.schema;
    return Array.isArray(schema.required) &&
      schema.required.indexOf(name) !== -1;
  }

  renderStepActions(step, propertyName) {
    const { stepIndex, totalSteps } = this.state;

    return (
      <div style={{ margin: '12px 0' }}>
        <RaisedButton
          label={stepIndex === (totalSteps - 1) ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext.bind(this, propertyName)}
          style={{ marginRight: 12 }}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev.bind(this, propertyName)}
          />
        )}
      </div>
    );
  }

  render() {
    const {
      schema,
      registry,
      uiSchema,
      errorSchema,
      idSchema,
      name,
      disabled,
      readonly
    } = this.props;

    const { fields } = registry;
    const { SchemaField } = fields;
    const { stepIndex, errors, formData } = this.state;

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
    return (
      <Stepper activeStep={stepIndex} orientation="vertical">
        {
          orderedProperties.map((propertyName, index) => {
            const subSchema = retrieveSchema(schema.properties[propertyName], registry.definitions);
            return (
              <Step>
                <StepLabel
                  onTouchTap={this.updateCurrentStep.bind(this, index, propertyName)}
                >{subSchema.title || propertyName}</StepLabel>
                <StepContent>
                  <SchemaField
                    key={index}
                    name={propertyName}
                    required={this.isRequired(propertyName)}
                    schema={subSchema}
                    uiSchema={uiSchema[propertyName]}
                    errorSchema={errorSchema[propertyName]}
                    error={errors[propertyName]}
                    idSchema={idSchema[propertyName]}
                    formData={formData[propertyName]}
                    onChange={this.onPropertyChange(propertyName)}
                    registry={registry}
                    disabled={disabled}
                    readonly={readonly}
                    hideTitle={true}
                  />
                  {(! (disabled || readonly)) && this.renderStepActions(index, propertyName)}
                </StepContent>
              </Step>
            );
          })
        }
      </Stepper>
    );
  }
}

StepperWidget.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  required: false,
  disabled: false,
  readonly: false
};

if (process.env.NODE_ENV !== 'production') {
  StepperWidget.propTypes = {
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

export default StepperWidget;
