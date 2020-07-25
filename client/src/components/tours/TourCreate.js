import React from 'react';
import { createTour, uploadTourImages } from '../../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TourForm from './TourForm';
import TourImageForm from './TourImageForm';

class TourCreate extends React.Component {
  state = { isTourCreated: false, tourId: null };

  handleSubmitTourForm = async (values) => {
    const {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      locations,
      startLocation,
      startDates,
      guideIds,
    } = values;
    const formValues = {
      name,
      duration,
      maxGroupSize,
      difficulty,
      price,
      summary,
      description,
      locations,
      startLocation,
      startDates,
      guides: guideIds,
      imageCover: '',
      images: [],
    };
    await this.props.createTour(formValues);
    this.setState({ isTourCreated: true, tourId: this.props.utils.tourId });
  };
  onImageSubmit = (fd) => {
    this.props.uploadTourImages(this.state.tourId, fd);
  };

  showForm() {
    if (
      this.state.isTourCreated &&
      this.props.error.createTourError === undefined
    ) {
      return <TourImageForm onImageSubmit={this.onImageSubmit} />;
    }
    return <TourForm onSubmit={this.handleSubmitTourForm} />;
  }

  render() {
    if (this.props.auth.role !== 'admin') return <Redirect to="/" />;
    return (
      <div>
        {this.showForm()}
        <br />
        <span class="tag is-warning is-light">
          {this.props.error.createTourError}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, utils: state.utils, error: state.error };
};

export default connect(mapStateToProps, { createTour, uploadTourImages })(
  TourCreate
);
