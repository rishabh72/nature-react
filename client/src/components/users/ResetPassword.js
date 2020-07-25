import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { resetPassword } from '../../actions';
import { Link } from 'react-router-dom';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.state = { errormsg: '' };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.errormsg !== this.props.errormsg) {
      this.setState({ errormsg: this.props.errormsg });
    }
  }
  renderError({ touched, error }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }

  renderInput = ({ input, meta, label, type }) => {
    const classError = `input ${meta.error && meta.touched ? 'is-danger' : ''}`;
    return (
      <div className="field">
        <div className="label">{label}</div>
        <div className="control">
          <input {...input} className={classError} type={type} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  displayError() {
    if (this.props.auth.loginError) {
      return (
        <div className="notification login-error is-danger has-text-weight-bold">
          {this.props.auth.loginError}
        </div>
      );
    }
    return null;
  }
  onSubmit = async (formValues) => {
    this.submitRef.current.disabled = true;
    await this.props.resetPassword(this.props.match.params.token, formValues);
    if (this.submitRef.current) {
      this.submitRef.current.disabled = false;
    }
  };
  errorOnSubmit() {
    if (this.state.errormsg.resetPasswordTokenExpired) {
      return (
        <div>
          <div className="subtitle is-6">
            &emsp; {` ${this.state.errormsg.resetPasswordTokenExpired}.`}
            <br />
            <Link to="/users/forgot-password" className="button is-text">
              Resend password reset email
            </Link>
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <section className="section">
        <div className="columns  is-centered">
          <div className="column is-two-thirds-desktop is-three-quarters-tablet ">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="title is-4">Reset Password</div>
              <hr />

              <Field
                type="password"
                label="Password"
                name="password"
                component={this.renderInput}
              />

              <Field
                type="password"
                label="Password Confirm"
                name="passwordConfirm"
                component={this.renderInput}
              />
              <div className="field is-grouped">
                <div className="control">
                  <button ref={this.submitRef} className="button is-link">
                    Reset Password
                  </button>
                </div>
              </div>
              {this.errorOnSubmit()}
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.password) {
    errors.password = 'Please enter password';
  } else if (formValues.password.length < 8) {
    errors.password = 'must be 8 characters or more';
  }
  if (!formValues.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  } else if (formValues.passwordConfirm !== formValues.password) {
    errors.passwordConfirm = 'password and confirmPassword must be same';
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { errormsg: state.error };
};
const formWrapped = reduxForm({
  form: 'password-reset-form',
  validate,
})(ResetPassword);

export default connect(mapStateToProps, { resetPassword })(formWrapped);
