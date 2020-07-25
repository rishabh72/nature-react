import React from 'react';
import history from '../../history';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { forgotPassword } from '../../actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.cancelRef = React.createRef();
    this.state = { errormsg: {}, notifications: {} };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.errormsg !== this.props.errormsg) {
      this.setState({
        errormsg: this.props.errormsg,
      });
    }
    if (prevProps.notifications !== this.props.notifications) {
      this.setState({
        notifications: this.props.notifications,
      });
    }
  }
  renderError({ touched, error }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }
  renderInput = ({ input, meta, type }) => {
    const classError = `input ${meta.error && meta.touched ? 'is-danger' : ''}`;

    return (
      <div className="field">
        <div className="control">
          <input {...input} className={classError} type={type} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = async (formValues) => {
    await this.setState({ errormsg: '' });
    this.submitRef.current.disabled = true;
    this.cancelRef.current.disabled = true;
    await this.props.forgotPassword(formValues);
    if (this.submitRef.current) {
      this.submitRef.current.disabled = false;
      this.cancelRef.current.disabled = false;
    }
  };
  afterSubmitError() {
    if (this.state.errormsg.forgotPasswordError) {
      return (
        <div className="subtitle is-6">
          {this.state.errormsg.forgotPasswordError}
        </div>
      );
    }
    return null;
  }
  render() {
    if (this.state.notifications.msg) {
      return (
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-two-thirds-desktop is-three-quarters-tablet">
              <div className="box">
                <div className="has-text-centered">
                  <br />
                  <div className="title is-spaced">
                    Password reset email sent
                  </div>
                  <hr />
                  <div className="subtitle">
                    We just sent a message to the email you provided with a link
                    to reset your password. Please check your inbox and follow
                    the instructions in the email.
                  </div>
                  <br />
                  <hr />
                  <div
                    onClick={() => this.setState({ notifications: {} })}
                    className="button is-text"
                  >
                    Resend password reset link
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="section">
        <div className="columns  is-centered">
          <div className="column is-two-thirds-desktop is-three-quarters-tablet ">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="title is-4">Forgot Password</div>
              <hr />
              <Field type="email" name="email" component={this.renderInput} />
              <div className="field is-grouped">
                <div className="control">
                  <button
                    ref={this.submitRef}
                    type="submit"
                    className="button is-link"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="control">
                  <button
                    ref={this.cancelRef}
                    onClick={() => history.goBack()}
                    className="button is-link is-light"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {this.afterSubmitError()}
            </form>
          </div>
        </div>
      </section>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'Please enter email';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'forgot-password-form',
  validate,
})(ForgotPassword);

const mapStateToProps = (state) => {
  return { notifications: state.utils, errormsg: state.error };
};
export default connect(mapStateToProps, { forgotPassword })(formWrapped);
