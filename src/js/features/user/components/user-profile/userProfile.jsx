import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, Avatar } from 'material-ui';

const validate = values => {
  const errors = {};
  const requiredFields = ['name', 'email'];
  requiredFields.forEach(field => {
    if (field === 'name' && (! values[field])) {
      errors[field] = 'Required';
    }
    if (field === 'email' && (! values[field])) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  divStyle: {
    width: '40% !important'
  },
  saveButton: {
    marginTop: '15px',
    float: 'right'
  },
  buttonMargin: {
    marginLeft: '5px'
  },
  buttonLabel: {
    textTransform: 'none'
  },
  formMargin: {
    marginLeft: '10px'
  }
};

class UserProfile extends React.Component {
  componentWillMount() {
    if (this.props.init) {
      this.props.init();
    }
  }

  render() {
    const { handleSubmit, onSave, pristine, onCancel, submitting } = this.props;
    return (
      <form style={styles.formMargin}>
        <div>
          <Field
            name="uniqueId" component={uniqueId =>
              <span style={{ float: 'right', textAlign: 'center' }}>
                <div>
                  <Avatar
                    errorText={uniqueId.touched && uniqueId.error}
                    src={`/users/${uniqueId.value}/avatar`}
                    size={120}
                    alt="Avatar"
                  />
                </div>
                <a href="#" style={{ float: 'bottom' }}>Change</a>
              </span>
          }
          />
        </div>
        <div>
          <Field
            name="uniqueId" component={uniqueId =>
              <TextField
                hintText="ID"
                floatingLabelText="ID"
                readOnly={true}
                errorText={uniqueId.touched && uniqueId.error}
                {...uniqueId}
              />
          }
          />
        </div>
        <div>
          <Field
            name="name" component={name =>
              <TextField
                hintText="Name"
                floatingLabelText="Name"
                errorText={name.touched && name.error}
                {...name}
              />
            }
          />
        </div>
        <div>
          <Field
            name="email" component={email =>
              <TextField
                hintText="Email"
                floatingLabelText="Email"
                errorText={email.touched && email.error}
                {...email}
              />
            }

          />
        </div>
        <div style={styles.saveButton}>
          <RaisedButton
            primary={true} disabled={pristine || submitting} label="Save" labelStyle={styles.buttonLabel}
            type="submit" onClick={handleSubmit((userData) => onSave(userData))}
          />
          <RaisedButton
            secondary={true} style={styles.buttonMargin}
            label="Cancel" labelStyle={styles.buttonLabel} onClick={onCancel}
          />
        </div>
      </form>
    );
  }
}

UserProfile = reduxForm({
  form: 'UserProfile',  // a unique identifier for this form
  validate
})(UserProfile);

export default UserProfile;

