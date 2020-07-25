import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUserPhoto } from '../../actions';
import ImageUpload from '../uploadImage';
import history from '../../history';
import { Redirect } from 'react-router-dom';

class UserImageEdit extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }
  onImageSubmit = (value) => {
    this.props.updateUserPhoto(this.props.match.params.id, value);
  };

  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;

    if (!this.props.user) {
      return null;
    }

    return (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <figure className="image is-128x128">
            <img
              src={`${process.env.REACT_APP_IMG_SOURCE}/users/${this.props.user.photo}`}
              alt="user"
            />
          </figure>
          <br />
          <ImageUpload
            onImageSubmit={this.onImageSubmit}
            fileTextColor="white"
            isCancelButton
            onDismiss={() => history.goBack()}
          />
        </div>
        <button
          onClick={() => history.goBack()}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users[ownProps.match.params.id], auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser, updateUserPhoto })(
  UserImageEdit
);
