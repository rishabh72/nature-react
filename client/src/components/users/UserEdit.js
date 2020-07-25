import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, editUser } from '../../actions';
import _ from 'lodash';
import UserForm from './UserForm';

import { Redirect } from 'react-router-dom';

class UserEdit extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editUser(this.props.match.params.id, formValues);
  };
  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    if (!this.props.user) {
      return 'Loading..';
    }
    return (
      <UserForm
        initialValues={_.pick(this.props.user, 'name', 'email', 'role')}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.id],
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchUser, editUser })(UserEdit);
