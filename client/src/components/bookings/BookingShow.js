import React from 'react';
import { getMyBookings } from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class BookingShow extends React.Component {
  componentDidMount() {
    this.props.getMyBookings();
  }
  renderBooking() {
    return this.props.bookings.map((booking) => {
      return (
        <div key={booking._id} className="column is-half-desktop">
          <div className="box">
            <div className="title has-text-grey-dark is-spaced is-4">
              <span className="icon ">
                <i className="fas fa-plane"></i>
              </span>
              &emsp;
              {booking.tour.name}
            </div>

            <div className="subtitle has-text-black">
              <span className="icon ">
                <i className="far fa-credit-card"></i>
              </span>
              &emsp;
              {booking.price}$
            </div>

            <div className="subtitle has-text-grey">
              <span className="icon ">
                <i className="fas fa-clock"></i>
              </span>
              &emsp;
              {new Date(booking.createdAt).toDateString()}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.auth.email) return <Redirect to="/" />;
    if (this.props.bookings.length < 1) {
      return (
        <div className="container">
          <br />
          <br />
          <div className="subtitle has-text-link has-text-centered">
            <span className="icon is-large ">
              <i className="fas fa-3x fa-ticket-alt"></i>
            </span>
            <br />
          </div>
          <p className="subtitle is-6 has-text-centered">Your Bookings</p>
          <br />
          <br />
          <br />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="columns is-multiline">{this.renderBooking()}</div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { bookings: Object.values(state.myBookings), auth: state.auth };
};

export default connect(mapStateToProps, { getMyBookings })(BookingShow);
