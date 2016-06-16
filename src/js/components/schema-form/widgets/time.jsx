import React from 'react';
import { TimePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import moment from 'moment';

export class TimeWidget extends React.Component {
  formatTime(date) {
    return moment(date).format('HH:mm');
  }

  handleOnChange(event, newDate) {
    this.props.onChange(moment(newDate).format('HH:mm'));
  }

  render() {
    const time = this.props.formData ? moment(this.props.formData, 'HH:mm').toDate() : null;
    const errors = {};
    /* eslint-disable no-underscore-dangle */
    if (this.props.errorSchema && this.props.errorSchema.__errors) {
      errors.errorText = this.props.errorSchema.__errors.join(', ');
    }
    /* eslint-enable no-underscore-dangle */

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.formatTime(time)}
        />
      );
    }

    return (
      <TimePicker
        name={this.props.name}
        defaultTime={time}
        format="24hr"
        floatingLabelText={this.props.schema.title}
        onChange={this.handleOnChange.bind(this)}
        {...errors}
      />);
  }
}
