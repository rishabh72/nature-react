import React from 'react';
import { Field, reduxForm } from 'redux-form';

class AccountForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }
  onSubmit = (formValues) => {
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
          <Field label="Name" name="name" component={this.renderInput} />
          <Field
            label="Email Address"
            name="email"
            component={this.renderInput}
          />

          <div className="field">
            <div className="control">
              <div className="buttons">
                <button className="button is-link">
                  <b>Update</b>
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
  if (!formValues.name) {
    errors.name = 'Please enter name';
  }
  if (!formValues.email) {
    errors.email = 'Please enter email';
  }

  return errors;
};

export default reduxForm({
  form: 'account-form',
  validate,
})(AccountForm);
