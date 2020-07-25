import React from 'react';
import Modal from '../Modal';
import { fetchUser, deleteUser } from '../../actions';
import { connect } from 'react-redux';
import history from '../../history';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class UserDelete extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  renderActions() {
    return (
      <div className="buttons is-right">
        <div
          onClick={() => this.props.deleteUser(this.props.match.params.id)}
          className="button is-info "
        >
          <b>Delete</b>
        </div>
        <Link to="/users" className="button">
          Cancel
        </Link>
      </div>
    );
  }
  renderTitle() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;
    if (!this.props.user) {
      return null;
    }
    return `Are you sure you want to delete user: ${this.props.user.name.toUpperCase()}`;
  }

  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    return (
      <Modal
        title="Confirm Delete User"
        content={this.renderTitle()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/users')}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id], auth: state.auth };
};
export default connect(mapStateToProps, { fetchUser, deleteUser })(UserDelete);
