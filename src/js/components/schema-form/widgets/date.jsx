import React from 'react';
import { DatePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import moment from 'moment';
import styles from '../styles';

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

    let help = null;
    if (this.props.uiSchema && this.props.uiSchema['ui:help']) {
      help = this.props.uiSchema['ui:help'];
    }

    if (this.props.readonly) {
      return (
        <ReadOnlyWidget
          title={this.props.schema.title}
          name={this.props.name}
          value={this.formatDate(this.props.formData)}
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
        <DatePicker
          name={this.props.name}
          value={date}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          textFieldStyle={styles.field}
          onChange={this.handleOnChange.bind(this)}
          formatDate={this.formatDate}
          disabled={this.props.disabled}
          help={help}
          {...errors}
        />
      </div>
    );
  }
}
