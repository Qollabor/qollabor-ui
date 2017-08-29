import React from 'react';
import PropTypes from 'prop-types';
import { RadioButtonGroup, RadioButton } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import styles from '../styles';

export class RadioWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    const defaultSelected = this.props.formData ? this.props.formData : this.props.defaultSelected;
    if (defaultSelected) {
      this.props.onChange(defaultSelected);
    }
  }

  handleOnChange(event, value) {
    this.props.onChange(value);
  }

  render() {
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

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
          help={help}
        />
      );
    }

    let helpWidget = false;
    if (help) {
      helpWidget = (
        <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}>
          <HelpWidget help={help} />
        </div>
      );
    }

    const options = this.props.options;
    const floatingLabelStyle = Object.assign({}, styles.floatingLabel, { lineHeight: '30px' });
    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    return (
      <div>
        {helpWidget}
        <label style={floatingLabelStyle}>
          {title !== undefined && title !== 'undefined' ? title : ''}
        </label>
        <RadioButtonGroup
          style={{ display: 'flex' }} name={this.props.name}
          defaultSelected={this.props.formData ? this.props.formData : this.props.defaultSelected}
          onChange={this.handleOnChange}
          {...errors}
        >
          {Object.keys(options).map(option =>
            (<RadioButton
              value={options[option]}
              label={option}
              style={styles.radioButton}
            />)
          )}
        </RadioButtonGroup>
      </div>
    );
  }
}

RadioWidget.propTypes = {
  errorSchema: PropTypes.object,
  defaultSelected: PropTypes.string,
  formData: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.object,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
