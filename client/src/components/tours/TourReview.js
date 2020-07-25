import React from 'react';
import { connect } from 'react-redux';
import { fetchTourReviews } from '../../actions';
import { Link } from 'react-router-dom';
import { getMyBookings } from '../../actions';
import _ from 'lodash';

class TourReview extends React.Component {
  componentDidMount() {
    this.props.fetchTourReviews(this.props.tourId);
    this.props.getMyBookings();
  }
  renderReviews() {
    if (!this.props.reviews) {
      return null;
    }
    return this.props.reviews.map((review, index) => {
      return (
        <React.Fragment key={index}>{this.reviewBox(review)}</React.Fragment>
      );
    });
  }
  renderReviewButton(review) {
    if (
      this.props.auth.role === 'admin' ||
      this.props.auth._id === review.user._id
    ) {
      return (
        <div className="buttons is-right">
          <Link to={`/reviews/edit/${review.id}`} className="button ">
            edit
          </Link>
          <Link
            to={`/reviews/delete/${review.id}`}
            className="button is-danger"
          >
            delete
          </Link>
        </div>
      );
    }
  }
  reviewBox = (review) => {
    return (
      <div className="column is-three-quarters">
        <div className="box">
          <article className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img
                  src={`${process.env.REACT_APP_IMG_SOURCE}/users/${review.user.photo}`}
                  alt={`${review.user.name}`}
                />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p>
                  <b>{review.user.name}</b>
                </p>
                <p className="has-text-weight-light">{review.review}</p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left">{this.renderStar(review)}</div>
              </nav>
            </div>
          </article>
          {this.renderReviewButton(review)}
        </div>
      </div>
    );
  };

  renderStar(review) {
    return [1, 2, 3, 4, 5].map((star) => {
      return (
        <div className="level-item" key={star}>
          <span className="icon is-small">
            <i className={`fa-star ${review.rating >= star ? 'fas' : 'far'}`} />
          </span>
        </div>
      );
    });
  }

  displayReviewButton() {
    const myReview = this.props.reviews.filter((r) => {
      return r.user._id === this.props.auth._id;
    });
    if (this.props.bookings[this.props.tourId] && myReview.length === 0) {
      return (
        <div>
          <div className="buttons is-centered">
            <Link
              to={`/tours/rate/${this.props.tourId}`}
              className="button is-medium is-warning is-centered"
            >
              Rate this tour
            </Link>
          </div>

          <hr />
          <br />
        </div>
      );
    }
  }
  render() {
    if (!this.props.reviews) {
      return null;
    }
    return (
      <div>
        {this.displayReviewButton()}
        <div className="title has-text-centered has-text-link is-uppercase">
          Reviews
        </div>

        <div className="columns is-centered is-multiline">
          {this.renderReviews()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: Object.values(state.reviews),
    auth: state.auth,
    bookings: _.mapKeys(Object.values(state.myBookings), 'tour.id'),
  };
};

export default connect(mapStateToProps, { fetchTourReviews, getMyBookings })(
  TourReview
);
