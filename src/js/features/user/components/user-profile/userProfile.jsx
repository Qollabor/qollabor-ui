import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, FlatButton } from 'material-ui';
import { ImageUpload } from '../../../../components/image-upload';

const validate = (values) => {
  const errors = {};
  const requiredFields = ['name', 'email'];
  requiredFields.forEach((field) => {
    if (field === 'name' && (!values[field])) {
      errors[field] = 'Required';
    }
    if (field === 'email' && (!values[field])) {
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
  render() {
    const { handleSubmit, onSave, pristine, onCancel, submitting, onAvatarUpdate, initialValues } = this.props;
    return (
      <form style={styles.formMargin}>
        {/* TODO uploading avatar not (yet) supported in new API/engine */}
        {/* <div>
          <Field
            name="userId" component={userId =>
              <span style={{ float: 'right', textAlign: 'center' }} userId={userId}>
                {initialValues && <ImageUpload user={initialValues} onUploadHandler={onAvatarUpdate} />}
              </span>
          }
          />
        </div> */}
        <div>
          <Field
            name="userId" component={userId =>
              <TextField
                hintText="ID"
                floatingLabelText="ID"
                readOnly={true}
                errorText={userId.touched && userId.error}
                {...userId}
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
            type="submit" onClick={handleSubmit(userData => onSave(userData))}
          />
          <FlatButton
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

UserProfile.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onAvatarUpdate: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
};

export default UserProfile;
