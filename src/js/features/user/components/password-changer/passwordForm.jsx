import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import validator from 'validator';
import styles from './styles';
import zxcvbn from 'zxcvbn';

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

  constructor(props) {
    super(props);
    this.state = {
      resultScore: '',
      resultStrength: ''
    };
  }

  handlePasswordChange(event) {
    if (event.target.name === 'newPassword') {
      event.preventDefault();
      const strength = {
        0: 'Worst',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
      };

      const val = event.target.value;
      const result = zxcvbn(val);

      // Update the text indicator
      if (val !== '') {
        this.setState({
          resultScore: result.score,
          resultStrength: strength[result.score]
        });
      } else {
        this.setState({
          resultScore: '',
          resultStrength: ''
        });
      }

      if (typeof this.props.onChange === 'function') {
        this.props.onChange(event);
      }
    }
  }

  render() {
    const { handleSubmit, onSave, pristine, submitting } = this.props;
    const { resultScore, resultStrength } = this.state;
    return (
      <form style={styles.formMargin} onChange={this.handlePasswordChange.bind(this)}>
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
            <section>
              <meter max="4" value={resultScore}></meter>
              <span style={styles.strengthLangStyle}>
                {resultStrength}
              </span>
            </section>
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
            primary={true} disabled={pristine || submitting} label="Save" labelStyle={styles.buttonLabel}
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

