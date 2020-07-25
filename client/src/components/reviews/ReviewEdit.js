import React from 'react';
import ReviewForm from './ReviewForm';
import { editReview, fetchReview } from '../../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

class ReviewEdit extends React.Component {
  componentDidMount() {
    this.props.fetchReview(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.editReview(this.props.match.params.id, formValues);
  };
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
      <div>
        <div className="title is-4 has-text-centered">Edit Review</div>
        <ReviewForm
          initialValues={_.pick(this.props.review, 'review', 'rating')}
          onSubmit={this.onSubmit}
        />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { review: state.reviews[ownProps.match.params.id], auth: state.auth };
};

export default connect(mapStateToProps, { editReview, fetchReview })(
  ReviewEdit
);
