import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui';
import moment from 'moment';
import { HelpWidget } from './help';
import styles from '../styles';

export class DateWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event, newDate) {
    this.props.onChange(this.formatDate(newDate));
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
          container={'dialog'}
          autoOk={false}
          floatingLabelText={title}
          floatingLabelFixed={true}
          floatingLabelFocusStyle={styles.floatingLabel}
          errorStyle={errorStyle}
          onChange={this.handleOnChange}
          disabled={this.props.disabled || this.props.readonly}
          textFieldStyle={this.props.readonly && { cursor: 'text' }}
          {...errors}
        />
      </div>
    );
  }
}

DateWidget.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.shape({
    format: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
  }),
  uiSchema: PropTypes.object
};
