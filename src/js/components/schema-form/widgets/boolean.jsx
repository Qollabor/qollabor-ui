import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'material-ui';
import { HelpWidget } from './help';
import styles from '../styles';

export class BooleanWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnCheck = this.handleOnCheck.bind(this);
  }

  handleOnCheck(event) {
    event.persist();
    this.props.onChange(event.target.checked);
  }

  render() {
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

    let helpWidget = false;
    if (help) {
      helpWidget = (
        <div
          style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}
        >
          <HelpWidget help={help} />
        </div>
      );
    }

    const title = this.props.schema.title + (this.props.required ? ' *' : '');

    return (
      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        {helpWidget}
        <Checkbox
          name={this.props.name}
          label={title}
          style={styles.field}
          onCheck={this.handleOnCheck}
          checked={this.props.formData}
          disabled={this.props.disabled || this.props.readonly}
        />
      </div>);
  }
}

BooleanWidget.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
