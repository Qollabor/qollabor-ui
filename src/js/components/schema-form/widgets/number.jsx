import React from 'react';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import { TextField } from 'material-ui';
import styles from '../styles';

export class NumberWidget extends React.Component {
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

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    /* eslint-enable no-underscore-dangle */
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
        <div style={{ zIndex: 100, float: 'right', top: '20px', position: 'relative' }}><HelpWidget help={help}/></div>;
    }

    const title = this.props.schema.title + (this.props.required ? ' *' : '');
    return (
      <div>
        {helpWidget}
        <TextField
          name={this.props.name}
          type="number"
          step="any"
          floatingLabelText={title}
          floatingLabelFixed={true}
          value={this.props.formData}
          style={styles.field}
          floatingLabelFocusStyle={styles.floatingLabel}
          onChange={this.handleOnChange.bind(this)}
          disabled={this.props.disabled}
          {...errors}
        />
      </div>
    );
  }
}
