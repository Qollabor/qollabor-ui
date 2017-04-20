import React from 'react';
import moment from 'moment';
import { DatePicker, TimePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import styles from '../styles';

export class DateTimeWidget extends React.Component {

  /*
    Since we are combing time and date picker,whenever there is a change in the datepicker,
    we update the form data with the selected date and whenever there is a change in the timeselector,
    we update the form date with the selected time.
  */
  getFormattedDate(date, isDate) {
    const formData = new Date(this.props.formData);
    const newDate = new Date(date);
    if (isDate) {
      formData.setDate(newDate.getDate());
      formData.setMonth(newDate.getMonth());
      formData.setFullYear(newDate.getFullYear());
    } else {
      formData.setTime(newDate.getTime());
    }
    return formData;
  }

  getLocaleDateTime(newDate) {
    const locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    moment.locale(locale);
    return `${moment(newDate).format('L')} ${moment(newDate).format('LT')}`;
  }


  formatDateTime(date) {
    return moment.utc(date).format();
  }


  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  handleOnChange(isDate, event, newDate) {
    const formattedDate = this.props.formData === undefined ?
      this.formatDate(newDate) : this.getFormattedDate(newDate, isDate);
    this.props.onChange(this.formatDateTime(formattedDate));
  }

  render() {
    const dateValue = this.props.formData || this.props.schema.defaultValue;
    let dateTime = null;
    if (dateValue === '$now') {
      dateTime = moment().toDate();
    } else {
      dateTime = dateValue ? moment.utc(dateValue).toDate() : null;
    }

    if (dateTime !== null) {
      this.props.onChange(this.formatDateTime(dateTime));
    }

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
          value={this.getLocaleDateTime(dateTime)}
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
    const errorStyle = Object.assign({}, styles.errorLabel, { transform: 'translate3d(0px, -24px, 0px)' });
    const locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    return (
      <div>
        {helpWidget}
        <DatePicker
          ref="dp"
          name={this.props.name}
          value={dateTime}
          locale={locale}
          container={'inline'}
          hintText={'Date'}
          autoOk={true}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          textFieldStyle={styles.field}
          errorStyle={errorStyle}
          onChange={this.handleOnChange.bind(this, true)}
          disabled={this.props.disabled}
          help={help}
          style={{ display: 'inline-block' }}
          {...errors}
        />
        <TimePicker
          name={this.props.name}
          defaultTime={dateTime}
          value={dateTime}
          autoOk={true}
          format="24hr"
          hintText={'Time'}
          floatingLabelText={' '}
          floatingLabelFixed={true}
          textFieldStyle={styles.field}
          errorStyle={errorStyle}
          floatingLabelFocusStyle={styles.floatingLabel}
          disabled={this.props.disabled}
          onChange={this.handleOnChange.bind(this, false)}
          style={{ display: 'inline-block', paddingLeft: '10px' }}
          {...errors}
        />
      </div>
    );
  }
}

DateTimeWidget.propTypes = {
  disabled: React.PropTypes.bool,
  error: React.PropTypes.shape({
    isError: React.PropTypes.bool,
    message: React.PropTypes.string
  }),
  errorSchema: React.PropTypes.object,
  formData: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readonly: React.PropTypes.bool,
  required: React.PropTypes.bool,
  schema: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};
