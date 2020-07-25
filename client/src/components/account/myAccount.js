import React from 'react';
import AccountForm from './accountForm';
import { connect } from 'react-redux';
import {
  fetchCurrentUser,
  updateCurrentUser,
  updateCurrentUserPasword,
  updateCurrentUserPhoto,
} from '../../actions';
import _ from 'lodash';
import PasswordForm from './passwordForm';
import UploadImage from '../uploadImage';
import { Link, Redirect } from 'react-router-dom';

class myAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: {} };
  }
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.error.ErrorOnupdateCurrentUserPhoto !==
      this.props.error.ErrorOnupdateCurrentUserPhoto
    ) {
      this.setState({ error: this.props.error });
    }
  }

  onSubmit = (formValues) => {
    this.props.updateCurrentUser(formValues);
    alert('Data updated successfully!');
  };
  onPasswordSubmit = (formValues) => {
    this.props.updateCurrentUserPasword(formValues);
    alert('password updated successfully!');
  };

  onImageSubmit = (values) => {
    this.props.updateCurrentUserPhoto(values);
  };
  uploadImageError() {
    if (this.state.error.ErrorOnupdateCurrentUserPhoto) {
      return (
        <div className="help is-danger">
          Not an image, please upload only images.
        </div>
      );
    }
    return null;
  }
  renderHelpSection() {
    if (this.props.auth.role !== 'user') {
      return null;
    }

    return (
      <div>
        <div className="subtitle">
          Any issue? Go to help section&nbsp;
          <span className="icon is-medium has-text-danger">
            <i className="fas fa-lg fa-hand-point-down"></i>
          </span>
        </div>
        <Link
          to={`/help/user/${this.props.auth._id}`}
          className="button is-warning"
        >
          <b>Go to help section</b>
        </Link>
      </div>
    );
  }

  render() {
    if (!this.props.auth.name) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <div className="title is-4 has-text-link">Your Account Settings</div>
        <figure className="image is-128x128">
          <img
            src={`${process.env.REACT_APP_IMG_SOURCE}/users/${this.props.auth.photo}`}
            alt="user"
          />
        </figure>
        <br />
        <UploadImage onImageSubmit={this.onImageSubmit} />
        {this.uploadImageError()}
        <hr />
        <AccountForm
          initialValues={_.pick(this.props.auth, 'name', 'email')}
          onSubmit={this.onSubmit}
        />
        <div className="notifySpace"></div>
        <hr />
        <div className="title is-4 has-text-link">Change Password</div>
        <PasswordForm onSubmit={this.onPasswordSubmit} />
        <br />
        <hr />
        <br />
        {this.renderHelpSection()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, error: state.error };
};

export default connect(mapStateToProps, {
  fetchCurrentUser,
  updateCurrentUser,
  updateCurrentUserPasword,
  updateCurrentUserPhoto,
})(myAccount);
