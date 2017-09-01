import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from 'material-ui';
import moment from 'moment';
import { HelpWidget } from './help';
import styles from '../styles';

export class TimeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

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

    return (
      <div>
        {helpWidget}
        <TimePicker
          ref="tp"
          name={this.props.name}
          defaultTime={time}
          format="24hr"
          autoOk={false}
          floatingLabelText={title}
          floatingLabelFixed={true}
          errorStyle={errorStyle}
          floatingLabelFocusStyle={styles.floatingLabel}
          disabled={this.props.disabled || this.props.readonly}
          textFieldStyle={this.props.readonly && { cursor: 'text' }}
          onFocus={this.handleOnFocus}
          onDismiss={this.handleOnDismiss}
          onChange={this.handleOnChange}
          {...errors}
        />
      </div>
    );
  }
}

TimeWidget.propTypes = {
  disabled: PropTypes.bool,
  error: PropTypes.object,
  errorSchema: PropTypes.object,
  formData: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  schema: PropTypes.object,
  uiSchema: PropTypes.object
};
