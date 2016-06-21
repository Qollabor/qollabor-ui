import React from 'react';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import { TextField } from 'material-ui';

export class IntegerWidget extends React.Component {
  handleOnChange(event) {
    event.persist();
    this.props.onChange(event.target.value);
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

    return (
      <div>
        {helpWidget}
        <TextField
          name={this.props.name}
          type="number"
          floatingLabelText={this.props.schema.title}
          value={this.props.formData}
          onChange={this.handleOnChange.bind(this)}
          {...errors}
        />
      </div>
    );
  }
}
