import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions, deleteQuestion } from '../../actions';
import { Link, Redirect } from 'react-router-dom';

class QuestionList extends React.Component {
  state = { isDisabled: false };
  componentDidMount() {
    this.props.fetchQuestions(this.props.match.params.userId);
  }
  onDeleteQuestion = async (question) => {
    await this.setState({ isDisabled: true });
    await this.props.deleteQuestion(question._id);
    await this.setState({ isDisabled: false });
  };
  renderQuestions() {
    if (this.props.questions.length === 0) {
      return <div className="has-text-centered ">No queries</div>;
    }
    return this.props.questions.map((question) => {
      return (
        <div className="box" key={question._id}>
          <div className="title is-4 has-text-link">{question.title}</div>
          <div className="subtitle is-6">
            {new Date(question.createdAt).toDateString()}
          </div>
          <div className="buttons">
            <Link
              to={`/help/user/${this.props.match.params.userId}/question/${question._id}`}
              className="button is-link is-outlined"
            >
              view
            </Link>
            <div
              disabled={this.state.isDisabled}
              onClick={() => this.onDeleteQuestion(question)}
              className="button is-danger is-outlined"
            >
              delete
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    if (!this.props.auth.role) {
      return null;
    }
    if (this.props.match.params.userId === this.props.auth._id) {
      return (
        <div>
          <div className="container">
            <br />
            <div className="buttons is-right">
              <Link
                to="/help/question"
                className="button is-rounded is-warning"
              >
                Ask a Question
              </Link>
            </div>
            <div className="subtitle has-text-centered has-text-success">
              My Questions
            </div>
            <hr />

            {this.renderQuestions()}
            <br />
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state) => {
  return { questions: Object.values(state.questions), auth: state.auth };
};
export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(
  QuestionList
);
