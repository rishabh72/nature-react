import React from 'react';
import { Field, reduxForm } from 'redux-form';
import history from '../../history';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return <p className="help is-danger">{error}</p>;
    }
  }

  renderDropdown(props) {
    return (
      <div className="field">
        <label className="label">{props.label}</label>
        <div className="control">
          <div className="select">
            <select {...props.input}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
    );
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
  onSubmit = async (formValues) => {
    this.submitRef.current.innerText = 'Please wait..';
    await this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field label="Review" name="review" component={this.renderInput} />
          <Field label="Rating" name="rating" component={this.renderDropdown} />
          <div className="field">
            <div className="control">
              <div className="buttons">
                <button
                  ref={this.submitRef}
                  className="button has-text-weight-bold	 is-black"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    history.goBack();
                  }}
                  className="button"
                >
                  Cancel
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
  if (!formValues.review) {
    errors.review = 'Please enter review';
  }
  if (!formValues.rating) {
    errors.rating = 'Please enter rating';
  }

  return errors;
};

export default reduxForm({
  form: 'review-form',
  validate,
})(ReviewForm);
