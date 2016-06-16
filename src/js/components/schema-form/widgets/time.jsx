import React from 'react';
import { TimePicker } from 'material-ui';
import moment from 'moment';

export class TimeWidget extends React.Component {
  handleOnChange(event, newDate) {
    this.props.onChange(moment(newDate).format('HH:mm:ss'));
  }

  render() {
    const date = this.props.formData ? moment(this.props.formData, 'HH:mm').toDate() : null;
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */
    return (
      <TimePicker
        name={this.props.name}
        defaultTime={date}
        format="24hr"
        floatingLabelText={this.props.schema.title}
        onChange={this.handleOnChange.bind(this)}
        {...errors}
      />);
  }
}
