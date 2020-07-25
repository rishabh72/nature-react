import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { deleteReview, fetchReview } from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ReviewDelete extends React.Component {
  constructor(props) {
    super(props);
    this.deleteRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchReview(this.props.match.params.id);
  }
  onDeleteReview = async () => {
    this.deleteRef.current.innerText = 'Please wait..';
    this.props.deleteReview(this.props.match.params.id);
  };
  renderActions() {
    return (
      <div className="buttons is-right">
        <div
          ref={this.deleteRef}
          onClick={() => this.onDeleteReview()}
          className="button is-danger is-outlined"
        >
          Delete
        </div>
        <button onClick={() => history.goBack()} className="button">
          cancel
        </button>
      </div>
    );
  }
  renderContent() {
    if (!this.props.review) {
      return 'Are you sure you want to delete this review?';
    }
    return `Are you sure you want to delete this review created at ${new Date(
      this.props.review.createdAt
    ).toLocaleDateString()} by ${this.props.review.user.name.toUpperCase()}.`;
  }

  render() {
    if (!this.props.review) {
      return null;
    }
    if (this.props.review.user) {
      if (
        this.props.review.user._id !== this.props.auth._id &&
        this.props.auth.role !== 'admin'
      ) {
        return <Redirect to="/" />;
      }
    }
    return (
      <Modal
        title="Review Delete"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.goBack()}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { review: state.reviews[ownProps.match.params.id], auth: state.auth };
};

export default connect(mapStateToProps, { deleteReview, fetchReview })(
  ReviewDelete
);
