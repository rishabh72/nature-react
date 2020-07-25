import React from 'react';
import { Field, reduxForm } from 'redux-form';

class AnswerForm extends React.Component {
  renderTextarea = ({ input, meta, label }) => {
    const classError = `textarea ${
      meta.error && meta.touched ? 'is-danger' : ''
    }`;
    return (
      <div className="field">
        <div className="label">{label}</div>
        <div className="control">
          <textarea {...input} className={classError} rows="4" />
        </div>
        {this.renderError(meta)}
      </div>
    );
  };
  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  showCancelButton() {
    return this.props.showCancelButton();
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="text" component={this.renderTextarea} />
        <div className="field">
          <div className="buttons">
            <button type="submit" className="button">
              Submit
            </button>
            {this.showCancelButton()}
          </div>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.text) {
    errors.text = 'Reply should not be empty';
  } else if (formValues.text.length < 15) {
    errors.text = 'Reply should have more or equal than 15 characters';
  } else if (formValues.text.length > 250) {
    errors.text = 'Reply should have less or equal than 250 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'answer-form',
  validate,
})(AnswerForm);
