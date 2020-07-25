import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers, searchUser, emptySearch } from '../../actions';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTextName: '',
      isSearched: false,
      filter: {},
      filterBy: 'All',
      showFilter: false,
    };
    this.filterRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }
  searchUser(text, filter) {
    const query = { name: text, filter: filter };
    this.props.searchUser(query);
  }
  onSearchUser = async (text) => {
    if (text === '') {
      this.setState({ isSearched: false });
      await this.searchUser('', {});
      return;
    }

    await this.searchUser(text);
    setTimeout(() => {
      this.setState({ isSearched: true });
    }, 1000);
  };

  card(user) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img
                  src={`${process.env.REACT_APP_IMG_SOURCE}/users/${user.photo}`}
                  alt={`${user.name}`}
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-5">{user.name}</p>
              <p className="subtitle is-6">{user.role}</p>
            </div>
          </div>
          <div className="content">
            <div className="subtitle is-6">{user.email}</div>
            <div className="subtitle is-6">{user._id}</div>
          </div>
        </div>
        <footer className="card-footer">
          <Link to={`/users/edit/${user._id}`} className="card-footer-item">
            Edit
          </Link>
          <Link to={`/users/delete/${user._id}`} className="card-footer-item">
            Delete
          </Link>
          <Link to={`/users/image/${user._id}`} className="card-footer-item">
            <span className="icon">
              <i className="fas fa-camera"></i>
            </span>
          </Link>
        </footer>
      </div>
    );
  }

  renderContent = () => {
    return this.props.users.map((user) => {
      return (
        <div
          key={user._id}
          className="column is-four-fifths-mobile is-two-fifths-tablet is-one-third-desktop"
        >
          {this.card(user)}
        </div>
      );
    });
  };
  renderBackToAllUsersBtn() {
    if (this.state.isSearched) {
      return (
        <div
          onClick={() => {
            this.setState({ isSearched: false });
            this.props.fetchAllUsers();
          }}
          className="button is-warning"
        >
          &#9755; All Users
        </div>
      );
    }
    return null;
  }
  renderResults() {
    if (this.props.users.length === 0 && this.state.isSearched) {
      return (
        <div className="container">
          <div className="subtitle has-text-grey has-text-centered">
            <span className="icon is-large">
              <i className="fas fa-2x fa-search"></i>
            </span>
          </div>
          <div className="title has-text-grey has-text-centered">
            No results found
          </div>
          <br />
          <div className="buttons is-centered">
            <button
              onClick={() => this.props.fetchAllUsers()}
              className="button is-text"
            >
              All Users
            </button>
          </div>
          <br />
        </div>
      );
    }
    if (this.props.users.length > 0) {
      return (
        <div>
          {this.renderBackToAllUsersBtn()}
          <br />

          <div className="columns is-mobile is-centered is-multiline">
            {this.renderContent()}
          </div>
        </div>
      );
    }
    return null;
  }
  renderSearch() {
    return (
      <div>
        <div className="control">
          <input
            onChange={(e) => this.setState({ searchTextName: e.target.value })}
            value={this.state.searchTextName}
            className="input is-rounded "
            type="text"
            placeholder="search users"
          />
        </div>
        <div className="control">
          <button
            onClick={() => this.onSearchUser(this.state.searchTextName)}
            className="mt-2 button is-rounded"
          >
            search
          </button>
        </div>
      </div>
    );
  }
  onFilterChange = async (e) => {
    this.filterRef.current.classList.add('is-loading');
    let filterOptions = {};
    if (e.target.value === 'admin') {
      filterOptions = { role: 'admin' };
    } else if (e.target.value === 'guide') {
      filterOptions = { role: 'guide' };
    } else if (e.target.value === 'lead-guide') {
      filterOptions = { role: 'lead-guide' };
    } else if (e.target.value === 'user') {
      filterOptions = { role: 'user' };
    } else {
      filterOptions = {};
    }
    await this.setState({ filterBy: e.target.value, filter: filterOptions });

    await this.searchUser(this.state.searchTextName, this.state.filter);
    setTimeout(() => {
      this.filterRef.current.classList.remove('is-loading');
    }, 1000);
  };
  onReset = async () => {
    await this.setState({ filterBy: 'All' });

    this.searchUser(this.state.searchTextName, {});
  };
  renderResetBtn = () => {
    console.log(this.state.filterBy);
    if (this.state.filterBy !== 'All') {
      return (
        <div onClick={this.onReset} className="button is-text">
          Reset
        </div>
      );
    }
    return null;
  };
  renderFilter() {
    return (
      <div>
        <button
          onClick={() => this.setState({ showFilter: !this.state.showFilter })}
          className="button"
        >
          <span className=" icon is-small">
            <i className="fas fa-filter"></i>
          </span>
          <span>Filter</span>
        </button>
        &emsp;
        <div ref={this.filterRef} className="select">
          <select
            onChange={(e) => this.onFilterChange(e)}
            value={this.state.filterBy}
          >
            <option>All</option>
            <option>admin</option>
            <option>lead-guide</option>
            <option>guide</option>
            <option>user</option>
          </select>
        </div>
        &emsp;
        {this.renderResetBtn()}
      </div>
    );
  }

  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    return (
      <div>
        <br />
        <div className=" container">
          {this.renderSearch()}
          <br />
          {this.renderFilter()}
        </div>
        <hr />
        {this.renderResults()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users),
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchAllUsers,
  searchUser,
  emptySearch,
})(UserShow);
