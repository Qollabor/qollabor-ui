import React from 'react';
import { DatePicker } from 'material-ui';
import { ReadOnlyWidget } from './readonly';
import { HelpWidget } from './help';
import moment from 'moment';
import styles from '../styles';

let activeDateElmt = null;
let datePickerDialog = null;
export class DateWidget extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode === 9 && datePickerDialog) {
      datePickerDialog.dismiss();
    }
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

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
    this.props.onChange(moment(newDate).format('YYYY-MM-DD'));
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
          ref="dp"
          name={this.props.name}
          value={date}
          container={'inline'}
          autoOk={true}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          textFieldStyle={styles.field}
          onChange={this.handleOnChange.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
          onDismiss={this.handleOnDismiss.bind(this)}
          formatDate={this.formatDate}
          disabled={this.props.disabled}
          help={help}
          {...errors}
        />
      </div>
    );
  }
}
