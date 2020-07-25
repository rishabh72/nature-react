import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class UserForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }
  renderInput = ({ input, meta, label }) => {
    const classError = `input ${meta.error && meta.touched ? 'is-danger' : ''}`;
    return (
      <div className="field">
        <div className="label">{label}</div>
        <div className="control">
          <input {...input} className={classError} />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field label="Email" name="email" component={this.renderInput} />
          <Field label="Role" name="role" component={this.renderInput} />
          <Field label="Name" name="name" component={this.renderInput} />
          <div className="field">
            <div className="control">
              <div className="buttons">
                <button className="button is-black">
                  <b>Submit</b>
                </button>
                <Link to="/users" className="button">
                  Cancel
                </Link>
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
  if (!formValues.email) {
    errors.email = 'Please enter email';
  }
  if (!formValues.role) {
    errors.role = 'Please enter role';
  }
  if (!formValues.name) {
    errors.name = 'Please enter name';
  }
  return errors;
};

export default reduxForm({
  form: 'user-form',
  validate,
})(UserForm);
