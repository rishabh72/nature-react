import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createQuestion } from '../../actions';
import { connect } from 'react-redux';

class QuestionCreate extends React.Component {
  state = { isDisabled: false };
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
  onSubmit = async (formValues) => {
    await this.setState({ isDisabled: true });
    await this.props.createQuestion(formValues);
    this.setState({ isDisabled: false });
  };

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <div className="title is-4 has-text-link">Ask Question</div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field label="Title" name="title" component={this.renderInput} />
          <Field
            label="Description"
            name="text"
            component={this.renderTextarea}
          />
          <div className="field">
            <div className="control">
              <button
                disabled={this.state.isDisabled}
                className="button is-info"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Please enter title of question';
  } else if (formValues.title.length < 10) {
    errors.title = 'Title should have more or equal than 10 characters';
  } else if (formValues.title.length > 50) {
    errors.title = 'Title should have less or equal than 50 characters';
  }
  if (!formValues.text) {
    errors.text = 'Question must contain description';
  } else if (formValues.text.length < 15) {
    errors.text = 'Description should have more or equal than 15 characters';
  } else if (formValues.text.length > 250) {
    errors.text = 'Description should have less or equal than 250 characters';
  }
  return errors;
};

export default connect(null, { createQuestion })(
  reduxForm({ form: 'question-form', validate })(QuestionCreate)
);
