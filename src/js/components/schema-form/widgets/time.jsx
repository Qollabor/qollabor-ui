import React from 'react';
import { TimePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import moment from 'moment';

export class TimeWidget extends React.Component {
  formatTime(date) {
    return moment(date).format('HH:mm');
  }

  handleOnChange(event, newDate) {
    this.props.onChange(moment(newDate).format('HH:mm:ss'));
  }

  render() {
    const time = this.props.formData ? moment(this.props.formData, 'HH:mm:ss').toDate() : null;
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
          value={this.formatTime(time)}
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
        <TimePicker
          name={this.props.name}
          defaultTime={time}
          format="24hr"
          floatingLabelText={this.props.schema.title}
          disabled={this.props.disabled}
          onChange={this.handleOnChange.bind(this)}
          {...errors}
        />
      </div>
    );
  }
}
