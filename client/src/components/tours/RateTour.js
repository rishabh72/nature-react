import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import {
  fetchTour,
  createReview,
  getMyBookings,
  fetchCurrentUser,
} from '../../actions';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

class RateTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = { review: '', rating: 1 };
    this.submitRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchTour(this.props.match.params.id);
    this.props.fetchCurrentUser();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth._id !== this.props.auth._id) {
      this.props.getMyBookings();
    }
  }
  renderforms() {
    return (
      <div className="">
        <div className="field">
          <div className="control">
            <textarea
              onChange={(e) => this.setState({ review: e.target.value })}
              className="textarea"
              placeholder="write review"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select">
              <select
                onChange={(e) => this.setState({ rating: e.target.value })}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onSubmit = () => {
    this.submitRef.current.innerText = 'Please wait..';
    this.props.createReview(this.state, this.props.match.params.id);
  };
  renderActions() {
    return (
      <div className="buttons is-right">
        <div
          ref={this.submitRef}
          onClick={this.onSubmit}
          className="button is-link"
        >
          Submit Review
        </div>
        <div onClick={() => history.goBack()} className="button">
          Cancel
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.auth.role) return <Redirect to="/" />;

    const myReview = this.props.reviews.filter((r) => {
      return r.user._id === this.props.auth._id;
    });

    if (
      this.props.bookings[this.props.match.params.id] !== undefined &&
      myReview.length === 0
    ) {
      return (
        <Modal
          title={`Rate ${this.props.tour.name}`}
          extraa={this.renderforms()}
          actions={this.renderActions()}
          onDismiss={() => history.goBack()}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    reviews: Object.values(state.reviews),

    tour: state.tours[ownProps.match.params.id],
    auth: state.auth,
    bookings: _.mapKeys(Object.values(state.myBookings), 'tour.id'),
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getMyBookings,
  fetchTour,
  createReview,
  fetchCurrentUser,
})(RateTour);
