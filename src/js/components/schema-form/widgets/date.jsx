import React from 'react';
import { DatePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import moment from 'moment';

export class DateWidget extends React.Component {
  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  handleOnChange(event, newDate) {
    this.props.onChange(moment(newDate).format('YYYY-MM-DD'));
  }

  render() {
    const date = this.props.formData ? moment(this.props.formData, 'YYYY-MM-DD').toDate() : null;

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
          value={this.formatDate(this.props.formData)}
        />
      );
    }

    return (
      <DatePicker
        name={this.props.name}
        value={date}
        floatingLabelText={this.props.schema.title}
        onChange={this.handleOnChange.bind(this)}
        formatDate={this.formatDate}
        {...errors}
      />);
  }
}
