import React from 'react';
import { connect } from 'react-redux';
import {
  fetchQuestion,
  createAnswer,
  fetchAnswers,
  deleteAnswer,
} from '../../actions';
import { reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import AnswerForm from './AnswerForm';

class QuestionShow extends React.Component {
  constructor(props) {
    super(props);
    this.textAreaRef = React.createRef();
    this.state = { showInput: false };
  }

  componentDidMount() {
    this.props.fetchQuestion(this.props.match.params.questionId);
    this.props.fetchAnswers(this.props.match.params.questionId);
  }
  showUserAndPhoto(question) {
    return (
      <div className="level is-mobile mb-3">
        <div className="level-left">
          <div className="level-item">
            <figure className="image is-48x48">
              <img
                alt="user"
                className="is-rounded"
                src={`${process.env.REACT_APP_IMG_SOURCE}/users/${question.user.photo}`}
              />
            </figure>
          </div>
          <div className="level-item">
            <div className="subtitle">{question.user.name}</div>
          </div>
        </div>
        <div className="level-right"></div>
      </div>
    );
  }
  renderEditDeleteBtn = (content) => {
    if (
      content.user._id === this.props.auth._id ||
      this.props.auth.role === 'admin'
    ) {
      return (
        <div className="level-left">
          <Link to={`/answers/edit/${content._id}`} className="level-item">
            <span style={{ cursor: 'pointer' }} className="icon">
              <i className="fas fa-edit"></i>
            </span>
          </Link>
          <div
            onClick={() => this.props.deleteAnswer(content._id)}
            className="level-item"
          >
            <span style={{ cursor: 'pointer' }} className="icon">
              <i className="fas fa-trash"></i>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  showCard = (content) => {
    return (
      <div key={content._id} className="notification is-light is-link">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">{this.showUserAndPhoto(content)}</div>
          </div>
          {this.renderEditDeleteBtn(content)}
        </div>

        {content.text}
      </div>
    );
  };
  onSubmit = async (formValues) => {
    this.setState({ showInput: false });
    await this.props.createAnswer(
      formValues,
      this.props.match.params.questionId
    );
  };
  showCancelButton = () => {
    return (
      <div
        onClick={() => this.setState({ showInput: false })}
        className="button"
      >
        Cancel
      </div>
    );
  };
  showReplyBox = () => {
    if (this.state.showInput) {
      return (
        <div className="columns">
          <div className="column">
            <AnswerForm
              onSubmit={this.onSubmit}
              showCancelButton={this.showCancelButton}
            />
          </div>
        </div>
      );
    }
  };
  renderButton() {
    if (!this.state.showInput) {
      return (
        <div className="buttons is-right">
          <div
            onClick={() => this.setState({ showInput: true })}
            className="button is-link"
          >
            Reply
          </div>
        </div>
      );
    }
  }
  renderAnswers() {
    if (!this.props.answers) return null;
    return this.props.answers.map((answer) => {
      return this.showCard(answer, 'link');
    });
  }
  renderContent(question) {
    return (
      <div>
        <div className="title has-text-black is-4">{question.title}</div>
        <div className="notification is-light is-warning">
          {this.showUserAndPhoto(question)}
          {question.text}
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.auth.role) {
      return null;
    }
    if (
      this.props.match.params.userId === this.props.auth._id ||
      this.props.auth.role === 'admin'
    ) {
      if (!this.props.question) {
        return null;
      }
      return (
        <div className="container">
          {this.renderContent(this.props.question)}
          <br />
          {this.renderAnswers()}
          <br />
          {this.renderButton()}
          {this.showReplyBox()}
          <br />
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    question: Object.values(state.questions)[0],
    answers: Object.values(state.answers),
    auth: state.auth,
  };
};

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

export default connect(mapStateToProps, {
  fetchQuestion,
  createAnswer,
  fetchAnswers,
  deleteAnswer,
})(reduxForm({ form: 'reply-form', validate })(QuestionShow));
