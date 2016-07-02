import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import validator from 'validator';

import styles from './styles';

const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'newPassword', 'confirmPassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
    if (field === 'newPassword' && values[field] && !validator.equals(values[field], values.confirmPassword)) {
      errors.confirmPassword = 'Password does not match';
    }
  });
  return errors;
};

class PasswordForm extends React.Component {

  render() {
    const { handleSubmit, onSave } = this.props;
    return (
      <form style={styles.formMargin}>
        <div>
          <div>
            <Field
              name="oldPassword" component={oldPassword =>
                <TextField
                  hintText="Current Password"
                  floatingLabelText="Current Password"
                  type="password"
                  errorText={oldPassword.touched && oldPassword.error}
                  {...oldPassword}
                />
              }
            />
          </div>
          <div>
            <Field
              name="newPassword" component={newPassword =>
                <TextField
                  hintText="New Password"
                  floatingLabelText="New Password"
                  type="password"
                  errorText={newPassword.touched && newPassword.error}
                  {...newPassword}
                />
              }
            />
          </div>
          <div>
            <Field
              name="confirmPassword" component={confirmPassword =>
                <TextField
                  hintText="Confirm Password"
                  floatingLabelText="Confirm Password"
                  type="password"
                  errorText={confirmPassword.touched && confirmPassword.error}
                  {...confirmPassword}
                />
              }
            />
          </div>
        </div>
        {this.props.saveError && this.props.saveError.message !== ''
        && <div style={Object.assign(styles.errorMessage, styles.headerMargin)}>
        Error: {this.props.saveError.message}</div>
        }
        <div style={styles.saveButton}>
          <RaisedButton
            primary={true} label="Save" labelStyle={styles.buttonLabel}
            type="submit" onClick={handleSubmit((userData) => onSave(userData))}
          />
          <RaisedButton
            secondary={true} style={styles.buttonMargin} label="Cancel"
            labelStyle={styles.buttonLabel} onTouchTap={this.props.onCancel}
          />
        </div>
      </form>
    );
  }
}

PasswordForm = reduxForm({
  form: 'PasswordForm',  // a unique identifier for this form
  validate
})(PasswordForm);

PasswordForm.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
};

export default PasswordForm;

