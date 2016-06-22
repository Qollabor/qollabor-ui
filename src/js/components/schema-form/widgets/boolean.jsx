import React from 'react';
import { Checkbox } from 'material-ui';
import { HelpWidget } from './help';

export class BooleanWidget extends React.Component {
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
          <HelpWidget help={help}/>
        </div>
      );
    }

    return (
      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        {helpWidget}
        <Checkbox
          name={this.props.name}
          label={this.props.schema.title}
          onCheck={this.handleOnCheck.bind(this)}
          checked={this.props.formData}
          {...errors}
          disabled={this.props.disabled || this.props.readonly}
        />
      </div>);
  }
}
