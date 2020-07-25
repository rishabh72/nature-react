import React from 'react';
import { connect } from 'react-redux';
import { fetchAllQuestions, deleteQuestion } from '../../actions';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.deleteQuestionRef = React.createRef();
    this.viewQuestionRef = React.createRef();
    this.state = { isDisabled: false };
  }
  componentDidMount() {
    this.props.fetchAllQuestions();
  }
  onClickDeleteQuestion = async (question) => {
    await this.setState({ isDisabled: true });
    await this.props.deleteQuestion(question._id);
    this.setState({ isDisabled: false });
  };
  renderQuestions() {
    return this.props.questions.map((question) => {
      return (
        <div className="box" key={question._id}>
          <div className="title is-4 has-text-link">{question.title}</div>
          <div className="subtitle is-6">
            {new Date(question.createdAt).toDateString()}
          </div>
          <div className="buttons">
            <Link
              disabled={this.state.isDisabled}
              to={`/help/user/${this.props.auth._id}/question/${question._id}`}
              className="button is-link is-outlined"
            >
              view
            </Link>
            <div
              disabled={this.state.isDisabled}
              onClick={() => this.onClickDeleteQuestion(question)}
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
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    if (this.props.questions.length === 0) {
      return (
        <div>
          <br />
          <br />
          <div className="has-text-centered">
            <div className="icon is-large">
              <i class="fas fa-3x fa-users"></i>
            </div>
          </div>

          <br />
          <br />
        </div>
      );
    }
    return <div className="container">{this.renderQuestions()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { questions: Object.values(state.questions), auth: state.auth };
};

export default connect(mapStateToProps, { fetchAllQuestions, deleteQuestion })(
  AllQuestions
);
