import React from 'react';
import { DatePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import moment from 'moment';
import styles from '../styles';

let activeDateElmt = null;
let datePickerDialog = null;
export class DateWidget extends React.Component {
  /*
    Material UI datepicker does not allow tabbing, also does not
    return the focus back to the controller after date selection.
    Hence we are manually handling both the features.
    Focus is set to the controller after a date selection
    or when the date controller is dismissed.
    Similary we are opening the date controller on focus of the
    controller, so that date controller is active while tabbing.
  */
  handleOnChange(event, newDate) {
    this.props.onChange(this.formatDate(newDate));
    activeDateElmt.focus();
  }

  handleOnFocus(event) {
    activeDateElmt = event.target;
    datePickerDialog = this.refs.dp.refs.dialogWindow;

    if (datePickerDialog.state.open === false) {
      this.refs.dp.openDialog();
    }
  }

  handleOnDismiss() {
    activeDateElmt.focus();
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  render() {
    const dateValue = this.props.formData || this.props.schema.defaultValue;
    let date = null;
    if (dateValue === '$today') {
      date = moment().toDate();
    } else {
      date = dateValue ? moment(dateValue, 'YYYY-MM-DD').toDate() : null;
    }

    if (date !== null) {
      this.props.onChange(this.formatDate(date));
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
          value={this.formatDate(this.props.formData)}
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
          value={date}
          locale={locale}
          container={'inline'}
          autoOk={true}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          textFieldStyle={styles.field}
          errorStyle={errorStyle}
          onChange={this.handleOnChange.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
          onDismiss={this.handleOnDismiss.bind(this)}
          disabled={this.props.disabled}
          help={help}
          {...errors}
        />
      </div>
    );
  }
}
