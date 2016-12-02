import React from 'react';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import { TextField } from 'material-ui';
import styles from '../styles';

export class IntegerWidget extends React.Component {
  handleOnChange(event) {
    event.persist();
    this.props.onChange(Number(event.target.value));
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
          type="number"
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          errorStyle={styles.errorLabel}
          style={styles.field}
          value={this.props.formData}
          onChange={this.handleOnChange.bind(this)}
          disabled={this.props.disabled}
          {...errors}
        />
      </div>
    );
  }
}
