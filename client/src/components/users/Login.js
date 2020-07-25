import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisabled: false };
    this.submitRef = React.createRef();
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
    if (_.isEmpty(this.props.errorOnSubmit)) {
      return null;
    }
    return (
      <div className="title is-5 has-text-danger has-text-centered">
        {this.props.errorOnSubmit.loginError}
      </div>
    );
  }

  onSubmit = async (formValues) => {
    this.submitRef.current.classList.add('Disabled');
    this.setState({ isDisabled: true });
    await this.props.login(formValues);
    if (this.submitRef.current) {
      this.submitRef.current.classList.remove('Disabled');
      this.setState({ isDisabled: false });
    }
  };

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="columns">
            <div className="column"></div>
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="box">
                <div className="title is-4">LOG INTO ACCOUNT</div>

                {this.displayError()}

                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <Field
                    type="email"
                    label="Email"
                    name="email"
                    component={this.renderInput}
                  />
                  <Field
                    type="password"
                    label="Password"
                    name="password"
                    component={this.renderInput}
                  />

                  <div className="field">
                    <p className="control">
                      <button
                        ref={this.submitRef}
                        className="button  is-info"
                        disabled={this.state.isDisabled}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                  <div className="field">
                    <Link
                      to="/users/forgot-password"
                      className="tag is-link is-light is-medium"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                  <div className="field">
                    <Link
                      to="/signup"
                      className="tag is-link is-light is-success is-medium"
                    >
                      New here! create new account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="column"></div>
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
  if (!formValues.password) {
    errors.password = 'Please enter password';
  } else if (formValues.password.length < 8) {
    errors.password = 'must be 8 characters or more';
  }
  return errors;
};

const formWrapped = reduxForm({
  form: 'loginForm',
  validate,
})(Login);

const mapStateToProps = (state) => {
  return { auth: state.auth, errorOnSubmit: state.error };
};

export default connect(mapStateToProps, { login })(formWrapped);
