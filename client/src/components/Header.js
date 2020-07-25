import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, fetchCurrentUser } from '../actions';

class Header extends React.Component {
  state = { active: false };
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  renderCreate() {
    if (this.props.auth.role === 'admin') {
      return (
        <div className="navbar-item">
          <Link to="/tours" className="button is-warning">
            create tour
          </Link>
        </div>
      );
    }
  }
  onLogoutClick = () => {
    this.props.logout();
  };
  renderDropdown = () => {
    if (this.props.auth.role !== 'user' && this.props.auth.role !== undefined) {
      return (
        <div className="navbar-start">
          <Link to="/allBookings" className="navbar-item">
            All Bookings
          </Link>
          <Link to="/users" className="navbar-item">
            Manage Users
          </Link>

          <Link to="/questions" className="navbar-item">
            Queries
          </Link>
        </div>
      );
    }

    if (this.props.auth.role === 'user') {
      return (
        <div className="navbar-start">
          <Link to="/bookings" className="navbar-item">
            My Bookings
          </Link>
        </div>
      );
    }
    return null;
  };
  renderContent() {
    if (!this.props.auth.email) {
      return (
        <div className="navbar-end">
          <Link to="/login" className="navbar-item">
            <div className="button  is-danger is-outlined">
              <strong>login</strong>
            </div>
          </Link>
          <Link to="/signup" className="navbar-item">
            <div className="button is-success is-outlined">
              <strong>signup</strong>
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-end">
          <div className="navbar-item">
            <div
              onClick={this.onLogoutClick}
              className="button is-outlined is-danger"
            >
              <strong>logout</strong>
            </div>
          </div>
          <div className="navbar-item">
            <Link to="/account" className="button is-success">
              <strong>My Account</strong>
            </Link>
          </div>
          {this.renderCreate()}
        </div>
      );
    }
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  render() {
    //console.log(this.props);
    return (
      <div>
        <nav
          className="navbar is-spaced"
          role="navigation"
          aria-label="main-navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <div className="title is-3">Nature</div>
            </Link>

            <div
              role="button"
              className={`navbar-burger burger ${
                this.state.active ? 'is-active' : ''
              }`}
              onClick={this.toggleClass}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div
            id="navbarBasicExample"
            className={`navbar-menu ${this.state.active ? 'is-active' : ''}`}
          >
            {this.renderDropdown()}
            {this.renderContent()}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, {
  logout,
  fetchCurrentUser,
})(Header);
