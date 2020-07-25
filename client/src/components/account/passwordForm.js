import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

class PasswordForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }
  onSubmit = (formValues, dispatch) => {
    dispatch(reset('password-form'));
    this.props.onSubmit(formValues);
  };
  renderInput = ({ input, meta, label }) => {
    const classError = `input ${meta.error && meta.touched ? 'is-danger' : ''}`;
    return (
      <div className="field">
        <div className="label has-text-link">{label}</div>
        <div className="control">
          <input {...input} className={classError} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            label="Current Password"
            name="passwordCurrent"
            component={this.renderInput}
          />
          <Field
            label="New Password"
            name="password"
            component={this.renderInput}
          />
          <Field
            label="Confirm New Password"
            name="passwordConfirm"
            component={this.renderInput}
          />

          <div className="field">
            <div className="control">
              <div className="buttons">
                <button className="button is-link">
                  <b>Update Password</b>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.passwordCurrent) {
    errors.passwordCurrent = 'Please enter current password';
  }
  if (!formValues.password) {
    errors.password = 'Please enter new password';
  } else if (formValues.password.length < 8) {
    errors.password = 'Password must be longer than 8 characters';
  }
  if (!formValues.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm new password';
  }
  if (formValues.passwordConfirm !== formValues.password) {
    errors.passwordConfirm =
      'new password and new password confirm must be same.';
  }

  return errors;
};

export default reduxForm({
  form: 'password-form',
  validate,
})(PasswordForm);
