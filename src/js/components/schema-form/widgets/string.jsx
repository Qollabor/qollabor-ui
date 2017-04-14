import React from 'react';
import { TextField } from 'material-ui';
import { DateWidget } from './date';
import { DateTimeWidget } from './datetime';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import { TimeWidget } from './time';
import { SelectWidget } from './select';
import { UserSelectorWidget } from './userselector';
import { RadioWidget } from './radio';
import { optionsList } from 'react-jsonschema-form/lib/utils';
import styles from '../styles';

export class StringWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    event.persist();
    this.props.onChange(event.target.value);
  }

  render() {
    if (this.props.schema.format === 'date') {
      return <DateWidget {...this.props} />;
    }

    if (this.props.schema.format === 'user-selector' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'user-selector')) {
      return <UserSelectorWidget {...this.props} />;
    }

    if (this.props.schema.format === 'radio' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'radio')) {
      if (this.props.uiSchema.options) {
        const options = this.props.uiSchema.options;
        return (<RadioWidget
          options={options}
          defaultSelected={this.props.uiSchema.defaultSelected}
          {...this.props}
        />);
      }
    }

    if (this.props.schema.format === 'date-time' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'date-time')
    ) {
      return <DateTimeWidget {...this.props} />;
    }

    if (
      this.props.schema.format === 'time' ||
      (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'time')
    ) {
      return <TimeWidget {...this.props} />;
    }

    if (this.props.schema.enum) {
      const enumOptions = optionsList(this.props.schema);
      return <SelectWidget options={enumOptions} {...this.props} />;
    }

    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */
    errors.errorText = this.props.error && this.props.error.message;

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.props.formData}
          multiline={this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'textarea'}
          help={help}
        />
      );
    }
    const style = Object.assign({}, styles.field, { width: '100%' });
    const floatingLabelFocusStyle = Object.assign({}, styles.floatingLabel, {
      transform: 'perspective(1px) scale(0.85) translate3d(0px, -24px, 0px)',
      top: 18
    });


    const textProps = Object.assign({}, {
      style,
      floatingLabelFocusStyle,
      errorStyle: styles.errorLabel
    });

    if (this.props.uiSchema && this.props.uiSchema['ui:widget'] === 'textarea') {
      textProps.multiLine = true;
      textProps.rows = this.props.uiSchema['ui:rows'] || 4;
      textProps.errorStyle = Object.assign({}, textProps.errorStyle,
        { transform: 'translate3d(0px, -24px, 0px)' });
    } else if (this.props.schema.title) {
      textProps.style.height = '50px';
      textProps.inputStyle = { height: '30px', top: '-2px' };
    }

    let helpWidget = false;
    if (help) {
      helpWidget =
        (
          <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}>
            <HelpWidget help={help} />
          </div>
        );
    }

    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    return (
      <div>
        {helpWidget}
        <TextField
          name={this.props.name}
          floatingLabelText={title}
          floatingLabelFixed={true}
          textareaStyle={{ marginTop: 16, marginBottom: 16 }}
          value={this.props.formData}
          onChange={this.handleOnChange}
          disabled={this.props.disabled}
          {...errors}
          {...textProps}
        />
      </div>
    );
  }
}

StringWidget.propTypes = {
  disabled: React.PropTypes.bool,
  error: React.PropTypes.object,
  errorSchema: React.PropTypes.object,
  formData: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};
