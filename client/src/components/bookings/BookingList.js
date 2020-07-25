import React from 'react';
import { connect } from 'react-redux';
import { getAllBookings, searchBooking } from '../../actions';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';

class BookingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  componentDidMount() {
    this.props.getAllBookings();
  }
  renderBooking(array) {
    console.log(array);
    return array.map((booking) => {
      return (
        <div
          key={booking._id}
          className="column is-half-desktop is-half-tablet"
        >
          <div className="box">
            <div className="subtitle">
              <span className="icon">
                <i className="fas fa-clock"></i>
              </span>
              &emsp;
              {new Date(booking.createdAt).toDateString()}
            </div>
            <div className="subtitle">
              <span className="icon ">
                <i className="fas fa-plane"></i>
              </span>
              &emsp;
              {booking.tour.name}
            </div>
            <div className="subtitle">
              <span className="icon ">
                <i className="fas fa-user"></i>
              </span>
              &emsp;
              {booking.user.name}
            </div>

            <div className="subtitle ">
              <span className="icon ">
                <i className="far fa-credit-card"></i>
              </span>
              &emsp;
              {booking.price}
            </div>
          </div>
        </div>
      );
    });
  }
  onSearchClick = () => {
    const query = { name: this.state.text, filter: {} };
    this.props.searchBooking(query);
  };
  renderSearchBookings() {
    return (
      <div className="container">
        <div className="control">
          <input
            onChange={(e) => this.setState({ text: e.target.value })}
            className="input is-rounded "
            type="text"
            placeholder="search booking"
          />
        </div>
        <div className="control">
          <button
            onClick={this.onSearchClick}
            className="mt-2 button is-rounded"
          >
            search
          </button>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    if (_.isEmpty(this.props.bookings)) {
      return null;
    }

    return (
      <div>
        <br />
        {/* {this.renderSearchBookings()} */}
        <br />
        <div className="container">
          <div className="columns is-multiline">
            {this.renderBooking(this.props.bookings)}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { bookings: state.myBookings, auth: state.auth };
};

export default connect(mapStateToProps, { getAllBookings, searchBooking })(
  BookingList
);
